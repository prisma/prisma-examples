#!/bin/sh

set -eu

yarn 
yarn prisma db push  
yarn dev &
pid=$!


sleep 10

npm run feed

kill "$pid"
