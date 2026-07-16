#!/bin/bash -e
#
# Load WebGS into GemStone as a Rowan project (Tonel source under ./src, load
# specs under ./rowan/specs). This is the Rowan replacement for the topaz
# fileout performed by install.sh.
#
# The optional Films OpenAPI demo is a Rowan project of its own (./Films),
# loaded into its own Films symbol dictionary — the Rowan replacement for
# installFilmsApi.sh. Pass --with-films (or films) to load it too.
#
# Requires:
#   * A running, Rowan-enabled stone.
#   * GEMSTONE / PATH set (see README).
#   * .topazini (here or in $HOME), e.g.:
#       set user DataCurator pass swordfish gems gs64stone
#
# Usage:
#   ./installRowan.sh                # WebGS framework + OpenAPI + Sample  (== install.sh)
#   ./installRowan.sh --with-films   # the above, plus the Films demo      (== install.sh + installFilmsApi.sh)
#
cd "$(dirname "$0")"
REPO="$PWD"
PARENT="$(dirname "$REPO")"

FILMS_LOAD=""
FILMS_MSG=""
case "${1:-}" in
  --with-films|films|--films)
    FILMS_LOAD="load value: 'file:$REPO/Films/rowan/specs/Films.ston' value: '$REPO' value: 'Films'."
    FILMS_MSG="msg := msg , '; loaded Films (' , (rowan projectNamed: 'Films') packageNames size printString , ' packages) into symbolDict Films'."
    ;;
  "") ;;
  *) echo "usage: $0 [--with-films]" >&2; exit 2 ;;
esac

topaz -lq << EOF
iferr 1 stk
iferr 2 output pop
iferr 3 stk
iferr 4 abort
iferr 5 logout
iferr 6 exit 1
set cachename WebGS_Rowan
login
output push WebGS.out only
fileformat utf8
run
| specClass load rowan msg |
specClass := (System myUserProfile symbolList resolveSymbol: #'RwSpecification') ifNil: [
  ^'ERROR: Rowan (RwSpecification) is not installed in this stone; cannot load WebGS as a Rowan project.'
] value.
load := [:url :home :name | | spec |
  spec := specClass fromUrl: url.
  spec projectsHome: home.
  spec resolve load.
  name].
"WebGS project -> WebGS symbol dictionary (== install.sh)"
load value: 'file:$REPO/rowan/specs/WebGS.ston' value: '$PARENT' value: 'WebGS'.
$FILMS_LOAD
System commit.
rowan := (System myUserProfile symbolList resolveSymbol: #'Rowan') value.
msg := 'Loaded WebGS (' , (rowan projectNamed: 'WebGS') packageNames size printString , ' packages) into symbolDict WebGS'.
$FILMS_MSG
msg
%
output pop
errorCount
logout
exit 0
EOF

if [ "$?" == "0" ]; then
  echo "Rowan load finished. Review WebGS.out for details."
else
  echo "Rowan load of WebGS failed. Please review WebGS.out and try again!"
fi
