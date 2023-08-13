#!/bin/sh
sourcce setEnv.sh

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 exit
run
Log instance logTypes: #(#'startup' "#'debug'" #'request' #'warning' #'error').
GciLibraryApp run: 50378
%
EOF
