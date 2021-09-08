#!/bin/sh

set -eu

yarn 
yarn prisma db push  
yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3001/filterPosts?searchString=Prisma'

kill "$pid"
