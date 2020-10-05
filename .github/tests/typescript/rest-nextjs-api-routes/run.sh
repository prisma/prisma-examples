#!/bin/sh

set -eu

yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/api/filterPosts?searchString=Prisma'

# check frontend
curl --fail 'http://localhost:3000/'

kill "$pid"
