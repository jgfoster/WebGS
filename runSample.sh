#!/bin/bash -e
source setEnv.sh

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 exit
run
Log instance logTypes: #(#'startup' "#'debug'" #'request' #'warning' #'error').
Sample runHttp
%
EOF
