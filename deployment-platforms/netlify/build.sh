#!/bin/bash

set -e

rm -rf functions-build
mkdir -p functions-build
cp -R ./prisma ./functions/prisma
cd functions/
zip -r index.zip *
mv index.zip ../functions-build/index.zip
cd ..