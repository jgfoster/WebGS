#!/bin/bash -e

# Installs the Films data class and the FilmsApi OpenAPI demo on top of WebGS.
# Run install.sh first, then this script, then sampleFilmsApi.sh.

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
output push ../FilmsApi.out only
errorCount
fileformat utf8
input ./Films.gs
input ./FilmsApi.gs
output pop
errorCount
commit
logout
exit 0
EOF

if [ "$?" == "0" ]; then
  echo "FilmsApi install was successful. Try sampleFilmsApi.sh."
else
  echo "Install of FilmsApi failed. Please review FilmsApi.out and try again!"
fi
