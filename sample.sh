#!/bin/bash -e

# Usage: ./sample.sh [-sessions=N] [-https]
#   -sessions=N  Number of sessions (default: 1; uses Sync if 1, Distributed if > 1)
#   -https       Use HTTPS instead of HTTP

sessions=1
https=false

for arg in "$@"; do
	case $arg in
		-sessions=*)
			sessions="${arg#*=}"
			;;
		-https)
			https=true
			;;
		*)
			echo "Unknown option: $arg"
			echo "Usage: $0 [-sessions=N] [-https]"
			exit 1
			;;
	esac
done

if [ "$sessions" -eq 1 ]; then
	if [ "$https" = true ]; then
		command="Sample runHttps."
	else
		command="Sample runHttp."
	fi
else
	if [ "$https" = true ]; then
		command="Sample runDistributedHttps: $sessions."
	else
		command="Sample runDistributedHttp: $sessions."
	fi
fi

topaz -lq << EOF
errorCount
iferr 1 stk
iferr 2 exit
set cachename WebGS
login
run
Log instance logTypes: #(#'startup' #'debug' #'request' #'warning' #'error').
Log instance logTypes: #(#'startup' #'warning' #'error').
$command
%
EOF
