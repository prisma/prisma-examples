#!/bin/bash


# We don't want -e as some commands will fail
# It's still fine for the script to continue execution

set -x

for d in */ ; do
  cd $d
  if [ -f "package.json" ]; then
    rm -rf node_modules
    yarn install
    yarn add --dev prisma@alpha -E
    yarn remove prisma-lib
    yarn add prisma-client-lib -E
    yarn prisma generate
  fi
  cd ..
done

