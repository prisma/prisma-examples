#!/bin/sh

set -eu

yarn 
yarn prisma db push --preview-feature
yarn dev &
pid=$!
sleep 15

curl --fail 'http://localhost:3000/filterPosts?searchString=Prisma'

kill "$pid"
