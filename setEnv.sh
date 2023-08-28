#!/bin/sh -ex

# set GEMSTONE and PATH environment variables
if [ "$GEMSTONE" = "" ]; then
  if [ -d "/opt/gemstone/product" ]; then
    export GEMSTONE=/opt/gemstone/product
  else 
    if [ -d "/Users/jfoster/Library/GemStone/GemStone64Bit3.6.6-i386.Darwin" ]; then
      export GEMSTONE=/Users/jfoster/Library/GemStone/GemStone64Bit3.6.6-i386.Darwin
    else
      export GEMSTONE=/path/to/gemstone/
    fi
  fi
fi
if [ ! -d "$GEMSTONE" ]; then
  echo "GemStone product tree not found. Please set GEMSTONE and try again!"
  exit 1
fi
export PATH=$GEMSTONE/bin:$PATH
