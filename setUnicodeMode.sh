#!/bin/bash -e
source setEnv.sh

topaz -lq << EOF
logout
set user SystemUser pass swordfish
login
send CharacterCollection enableUnicodeComparisonMode
commit
logout
exit 0
EOF
