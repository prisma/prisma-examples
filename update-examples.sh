#!/bin/bash


# We don't want -e as some commands will fail
# It's still fine for the script to continue execution

set -x

for d in */ ; do
  cd $d
  if [ -f "package.json" ]; then
    echo 'Removing Node Modules'
    rm -rf node_modules
    yarn install
    yarn add --dev prisma@beta -E
    yarn add prisma-client-lib -E

    echo 'Running Prisma Generate'
    yarn prisma generate
  fi
  cd ..
done
