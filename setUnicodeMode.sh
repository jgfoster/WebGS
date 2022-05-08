topaz -lq << EOF
logout
set user SystemUser pass swordfish
login
send CharacterCollection enableUnicodeComparisonMode
commit
logout
EOF
