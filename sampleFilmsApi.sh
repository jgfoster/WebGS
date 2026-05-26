#!/bin/bash -e

# Usage: ./sampleFilmsApi.sh
#
# Launches the FilmsApi OpenAPI demo on http://localhost:8888 .
#   GET /films            - list films
#   GET /films/:id        - one film
#   GET /openapi.json     - the OpenAPI 3 spec
#   GET /docs             - Swagger UI

command="FilmsApi runHttp."

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 exit
set cachename WebGS
login
run
Log instance logTypes: #(#'startup' #'warning' #'error').
$command
%
EOF
