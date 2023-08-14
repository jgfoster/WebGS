#!/bin/sh -e
source setEnv.sh

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 abort
iferr 3 logout
iferr 4 exit 1

output push GCI.out only
input ./GCI/GciJsonParser.gs
input ./GCI/GciApp.gs
send GciTsLibraryFull initializeFunctions
output pop
run
Log instance logTypes: #(#'startup' #'debug' #'request' #'warning' #'error').
System commit.
GciLibraryApp run: 50378
%
EOF
