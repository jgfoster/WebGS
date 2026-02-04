#!/bin/bash -e

cd ./src
topaz -lq << EOF
iferr 1 stk
iferr 2 output pop
iferr 3 stk
iferr 4 abort
iferr 5 logout
iferr 6 exit 1
errorCount
set cachename WebGS_Server
login
output push ../WebGS.out only
errorCount
fileformat utf8
input ./WebGS.gs
output pop
errorCount
commit
logout
exit 0
EOF

if [ "$?" == "0" ]; then
  echo "Install was successful. Try sample.sh or your own code."
else
  echo "Install of WebGS failed. Please review WebGS.out and try again!"
fi
