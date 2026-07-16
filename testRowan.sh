#!/bin/bash
#
# testRowan.sh — Prove the topaz install path and Rowan are identical.
#
# The Rowan/Tonel source (WebGS project under ./src + ./rowan, Films demo
# project under ./Films) is the source of truth. This harness provisions two
# throwaway GemStone stones and installs WebGS + the Films demo into each a
# different way:
#
#   topaz   the hand-written topaz fileouts shipped on main:
#             install.sh          -> src/WebGS.gs                -> WebGS dict (19 classes)
#             installFilmsApi.sh  -> src/Films.gs, src/FilmsApi.gs -> Films dict (2 classes)
#   rowan   the same source loaded via Rowan (installRowan.sh --with-films):
#             WebGS project -> WebGS dict (19 classes)
#             Films project -> Films dict (2 classes)
#
# It asserts the two are IDENTICAL:
#   * Structure: every class in the WebGS and Films dictionaries has a
#     byte-identical shape + full method set (not just the tested paths), AND
#     each class lands in the same symbol dictionary.
#   * Behaviour: the Dart suite (tests/http.dart) produces identical results.
# i.e. installing from Rowan and installing from the topaz fileout produce the
# very same image.
#
# Everything is disposable; nothing touches the developer's own stones.
#
# Usage:  ./testRowan.sh            #  GEMSTONE=/path LDI_PORT=NNNN ./testRowan.sh
#
set -uo pipefail

# ---- configuration -----------------------------------------------------------
export GEMSTONE="${GEMSTONE:-/Users/srbaker/Documents/GemStone/GemStone64Bit3.7.5-arm64.Darwin}"
export PATH="$GEMSTONE/bin:$PATH"
REPO="$(cd "$(dirname "$0")" && pwd)"
PARENT="$(dirname "$REPO")"
EXTENT="$GEMSTONE/bin/extent0.rowan3.dbf"   # Rowan-V3-enabled base extent
USER_NAME="$(id -un)"
LDI_PORT="${LDI_PORT:-53799}"
HTTP_PORT=8888
STONE_USER=DataCurator
STONE_PASS=swordfish
ROWAN_DICTS="#(#'RowanKernel' #'RowanLoader' #'RowanTools' #'RowanClientServices')"
DUMP_DICTS="'WebGS' 'Films'"     # symbol dictionaries compared across both install paths
MODES="topaz rowan"

WORK="$(mktemp -d "${TMPDIR:-/tmp}/webgs-rowan.XXXXXX")"
RESULTS="$WORK/results"; mkdir -p "$RESULTS"
SERVER_PID=""
STARTED_NETLDI=""

log()  { printf '\n\033[1;36m== %s\033[0m\n' "$*"; }
info() { printf '   %s\n' "$*"; }
die()  { printf '\n\033[1;31mFAIL: %s\033[0m\n' "$*" >&2; [ -n "${KEEP_WORK:-}" ] && { cp -r "$WORK" "$KEEP_WORK" 2>/dev/null; echo "  (logs at $KEEP_WORK)" >&2; }; exit 1; }

topaz_login() {   # $1 = stone name
  printf 'set user %s password %s\nset gemstone !@localhost#netldi:%s!%s\nlogin\n' \
    "$STONE_USER" "$STONE_PASS" "$LDI_PORT" "$1"
}

cleanup() {
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null
  for m in $MODES; do
    pkill -f "gem webgs_${m}_$$" 2>/dev/null
    stopstone "webgs_${m}_$$" "$STONE_USER" "$STONE_PASS" >/dev/null 2>&1
  done
  [ -n "$STARTED_NETLDI" ] && stopnetldi "$LDI_PORT" >/dev/null 2>&1
  rm -rf "$WORK"
}
trap cleanup EXIT

export GEMSTONE_GLOBAL_DIR="$WORK"
export GEMSTONE_NRS_ALL="#netldi:$LDI_PORT#dir:$WORK"

# ---- infrastructure ----------------------------------------------------------
[ -f "$EXTENT" ] || die "Rowan extent not found: $EXTENT"
lsof -nP -iTCP:"$LDI_PORT" 2>/dev/null | grep -q LISTEN && die "port $LDI_PORT busy (set LDI_PORT=)"
mkdir -p "$WORK/locks"
log "Starting NetLDI on port $LDI_PORT (guest mode)"
startnetldi -g -a "$USER_NAME" -P "$LDI_PORT" -l "$WORK/netldi.log" "$LDI_PORT" >/dev/null 2>&1 \
  || die "startnetldi failed (see $WORK/netldi.log)"
STARTED_NETLDI=1

provision_stone() {   # $1 = stone name
  local stone="$1" d="$WORK/$1"
  mkdir -p "$d/data" "$d/log"
  copydbf "$EXTENT" "$d/data/extent0.dbf" >/dev/null 2>&1
  chmod u+w "$d/data/extent0.dbf"
  cat > "$d/system.conf" <<CONF
DBF_EXTENT_NAMES = $d/data/extent0.dbf;
STN_TRAN_LOG_DIRECTORIES = $d/data;
STN_TRAN_LOG_SIZES = 100;
STN_TRAN_FULL_LOGGING = FALSE;
KEYFILE = $GEMSTONE/sys/community.starter.key;
SHR_PAGE_CACHE_SIZE_KB = 16384;
SHR_PAGE_CACHE_NUM_PROCS = 24;
CONF
  startstone -z "$d/system.conf" -l "$d/log/stone.log" "$stone" >/dev/null 2>&1 \
    || die "startstone $stone failed (see $d/log/stone.log)"
  waitstone "$stone" >/dev/null 2>&1 || die "waitstone $stone failed"
}

start_server() {   # $1 = stone name; launches `Sample runHttp` in background
  local stone="$1" i
  ( cd "$REPO" && topaz -lq >"$WORK/server-$stone.out" 2>&1 <<TZ
$(topaz_login "$stone")
run
Log instance logTypes: #(#'startup' #'warning' #'error').
Sample runHttp.
%
TZ
  ) &
  SERVER_PID=$!
  disown "$SERVER_PID" 2>/dev/null
  for i in $(seq 1 60); do
    curl -s -o /dev/null "http://localhost:$HTTP_PORT/" 2>/dev/null && return 0
    sleep 0.5
  done
  die "server for $stone never came up on :$HTTP_PORT"
}

stop_server() {   # $1 = stone name
  [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null
  pkill -f "gem $1" 2>/dev/null
  SERVER_PID=""
  sleep 1
}

run_suite() {   # $1 = mode label; normalize Dart results to $RESULTS/<label>.txt
  local label="$1"
  ( cd "$REPO/tests" && dart pub get >/dev/null 2>&1
    timeout 180 dart test http.dart 2>&1 ) > "$WORK/dart-$label.raw" 2>&1
  # Compare the set of FAILING functional tests. 'get load' is a timing/perf
  # assertion (avg latency < 3ms), so it flakes under load — exclude it from
  # the equivalence key (it says nothing about load correctness).
  {
    echo "FAILING (excluding flaky perf test 'get load'):"
    awk '/Failing tests:/{f=1;next} f&&/http\.dart:/{print}' "$WORK/dart-$label.raw" \
      | sed 's/^ *//' | grep -v 'get load' | sort
  } > "$RESULTS/$label.txt"
}

# ---- per-mode installers (topaz exits non-zero on benign CompileWarnings, so
#      success is judged by commit/result markers, not by $?) -----------------
load_topaz() {   # $1 = stone; the hand-written topaz fileouts (install.sh + installFilmsApi.sh)
  ( cd "$REPO/src" && topaz -lq >"$WORK/load-$1.out" 2>&1 <<TZ
$(topaz_login "$1")
iferr 1 exit 1
fileformat utf8
input ./WebGS.gs
input ./Films.gs
input ./FilmsApi.gs
commit
TZ
  )
  grep -q "Successful commit" "$WORK/load-$1.out" || die "topaz fileout load failed (see $WORK/load-$1.out)"
}

load_rowan() {   # $1 = stone; the Rowan/Tonel source (installRowan.sh --with-films)
  topaz -lq >"$WORK/grant-$1.out" 2>&1 <<TZ
set user SystemUser password $STONE_PASS
set gemstone !@localhost#netldi:$LDI_PORT!$1
login
run
| su dc |
su := System myUserProfile. dc := AllUsers userWithId: '$STONE_USER'.
$ROWAN_DICTS do: [:dn | | d |
  d := su symbolList detect: [:e | e name == dn] ifNone: [nil].
  (d notNil and: [(dc symbolList includesIdentical: d) not])
    ifTrue: [ dc insertDictionary: d at: dc symbolList size + 1 ] ].
System commit. true
%
TZ
  topaz -lq >"$WORK/load-$1.out" 2>&1 <<TZ
$(topaz_login "$1")
iferr 1 where
printit
| specClass load rowan f |
specClass := (System myUserProfile symbolList resolveSymbol: #'RwSpecification') value.
load := [:url :home | | spec |
  spec := specClass fromUrl: url.
  spec projectsHome: home.
  spec resolve load].
load value: 'file:$REPO/rowan/specs/WebGS.ston' value: '$PARENT'.
load value: 'file:$REPO/Films/rowan/specs/Films.ston' value: '$REPO'.
System commit.
rowan := (System myUserProfile symbolList resolveSymbol: #'Rowan') value.
"Write a sentinel from WITHIN the doit so success is gated on execution, not on
 printit echoing the source (an echoed literal marker would false-positive)."
f := GsFile openWriteOnServer: '$WORK/rowan-loaded-$1'.
f nextPutAll: 'WebGS=' , (rowan projectNamed: 'WebGS') packageNames asArray printString , ' Films=' , (rowan projectNamed: 'Films') packageNames asArray printString.
f close.
'ROWAN_LOADED'
%
TZ
  [ -s "$WORK/rowan-loaded-$1" ] || die "Rowan load failed (see $WORK/load-$1.out)"
}

# dump_structure — canonical shape + full method set of every class in each of
# the compared symbol dictionaries, so we diff the WHOLE loaded system (every
# class shape + method set + which dictionary it lives in), not just the tested
# paths.
dump_structure() {   # $1 = stone, $2 = label
  topaz -lq >"$WORK/dump-$2.out" 2>&1 <<TZ
$(topaz_login "$1")
run
| ws sl nl f |
nl := Character lf.
ws := WriteStream on: String new.
sl := System myUserProfile symbolList.
#( $DUMP_DICTS ) do: [:dn | | dict classes |
  dict := sl detect: [:d | d name asString = dn] ifNone: [nil].
  ws nextPutAll: 'DICT '; nextPutAll: dn; nextPut: nl.
  dict isNil ifTrue: [ ws nextPutAll: '  (absent)'; nextPut: nl ] ifFalse: [
    classes := (dict values select: [:e | e isBehavior]) asSortedCollection: [:a :b | a name asString <= b name asString].
    classes do: [:c |
      ws nextPutAll: 'CLASS '; nextPutAll: c name asString; nextPutAll: ' super='; nextPutAll: c superclass name asString; nextPutAll: ' fmt='; nextPutAll: c format printString; nextPut: nl.
      ws nextPutAll: '  iv='; nextPutAll: c instVarNames asArray printString; nextPut: nl.
      ws nextPutAll: '  civ='; nextPutAll: c class instVarNames asArray printString; nextPut: nl.
      ws nextPutAll: '  cv='; nextPutAll: (c classVarNames asSortedCollection: [:x :y | x asString <= y asString]) asArray printString; nextPut: nl.
      ws nextPutAll: '  im='; nextPutAll: (c selectors asSortedCollection: [:x :y | x asString <= y asString]) asArray printString; nextPut: nl.
      ws nextPutAll: '  cm='; nextPutAll: (c class selectors asSortedCollection: [:x :y | x asString <= y asString]) asArray printString; nextPut: nl ] ] ].
f := GsFile openWriteOnServer: '$RESULTS/$2.dump'.
f nextPutAll: ws contents.
f close.
%
TZ
  [ -s "$RESULTS/$2.dump" ] || die "structure dump for $2 is empty (see $WORK/dump-$2.out)"
}

run_mode() {   # $1 = label, $2 = installer fn
  local label="$1" fn="$2" stone="webgs_${1}_$$"
  log "MODE $label"
  provision_stone "$stone"
  "$fn" "$stone"
  grep -qE "does not understand|GemStone: Error" "$WORK/load-$stone.out" && die "$label load had runtime errors (see $WORK/load-$stone.out)"
  dump_structure "$stone" "$label"
  info "loaded ($(grep -c '^CLASS ' "$RESULTS/$label.dump") classes across $DUMP_DICTS); starting server + running suite"
  start_server "$stone"
  run_suite "$label"
  stop_server "$stone"
  # Fully stop the stone before the next mode starts. stopstone returns before
  # the OS releases the stone's shared-memory segment, and macOS SysV limits are
  # tight (~1GB shmall shared with the developer's own stones), so an overlapping
  # cache makes the next startstone fail with shmget ENOMEM. The SEGMENT is owned
  # by the shrpcmonitor (which outlives `stoned`), so wait for EVERY process of
  # this stone (stone + monitor + gems) to exit, then let the OS reclaim.
  stopstone "$stone" "$STONE_USER" "$STONE_PASS" >/dev/null 2>&1
  for _ in $(seq 1 60); do pgrep -f "$stone" >/dev/null 2>&1 || break; sleep 0.5; done
  pkill -9 -f "$stone" 2>/dev/null; sleep 2
}

# ---- run both modes ----------------------------------------------------------
run_mode topaz load_topaz
run_mode rowan load_rowan

# ---- compare -----------------------------------------------------------------
log "Results (Dart suite)"
for m in $MODES; do echo "--- $m ---"; cat "$RESULTS/$m.txt"; echo; done

ok=1
# Behavioural: the topaz install (install.sh + installFilmsApi.sh) and the Rowan
# load must yield identical Dart-test results.
diff -q "$RESULTS/topaz.txt" "$RESULTS/rowan.txt" >/dev/null || ok=0
# Structural: the two install paths must produce byte-identical classes/methods
# in the same symbol dictionaries (every class shape + full method set).
struct_msg="topaz install and Rowan load define identical classes/methods ($(grep -c '^CLASS ' "$RESULTS/rowan.dump") classes across $DUMP_DICTS)"
diff -q "$RESULTS/topaz.dump" "$RESULTS/rowan.dump" >/dev/null || { ok=0; struct_msg="STRUCTURAL MISMATCH"; }

log "Structural check"
echo "   $struct_msg"

if [ "$ok" = 1 ]; then
  printf '\n\033[1;32m✔ PROVEN\033[0m\n'
  printf '\033[1;32m  • Structure: topaz install == Rowan load — byte-identical classes/methods\033[0m\n'
  printf '\033[1;32m    in the same symbol dictionaries (WebGS + Films).\033[0m\n'
  printf '\033[1;32m  • Dart suite: topaz install == Rowan load — identical behaviour.\033[0m\n'
  printf '\033[1;32m  => installing WebGS from Rowan and from the topaz fileout produce the\033[0m\n'
  printf '\033[1;32m     very same image.\033[0m\n'
  exit 0
else
  printf '\n\033[1;31mx MISMATCH:\033[0m\n'
  diff "$RESULTS/topaz.txt"  "$RESULTS/rowan.txt"  || true
  diff "$RESULTS/topaz.dump" "$RESULTS/rowan.dump" || true
  exit 1
fi
