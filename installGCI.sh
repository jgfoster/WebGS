echo "This will reload your WebGS code."
echo "Make sure you have saved all your edits!"
read -n 1 -s -r -p "Press any key to continue"
topaz -lq << EOF
iferr 1 stk
iferr 2 output pop
iferr 3 stk
iferr 4 abort
iferr 5 logout
iferr 6 exit
errorCount
output push WebGS.out only
errorCount
fileformat utf8
input ./WebGS.gs
input ./GCI/GciApp.gs
output pop
errorCount
commit
iferr 1 stk
iferr 2 exit
send GciLibraryApp run: 50378
EOF
