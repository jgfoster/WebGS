#!/bin/sh -e

# set GEMSTONE and PATH environment variables
if [ -d "/Users/jfoster/Library/GemStone/GemStone64Bit3.6.6-i386.Darwin" ]; then
  export GEMSTONE=/Users/jfoster/Library/GemStone/GemStone64Bit3.6.6-i386.Darwin
else
  if [ "$GEMSTONE" == "" ]; then
    export GEMSTONE=/path/to/gemstone
  fi
fi
if [ ! -d "$GEMSTONE" ]; then
  echo "GemStone product tree not found. Please set GEMSTONE and try again!"
  exit 1
fi
export PATH=$GEMSTONE/bin:$PATH
