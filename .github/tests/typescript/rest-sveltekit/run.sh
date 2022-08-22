#!/bin/sh

set -eu

npm install 
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 15

curl --fail 'http://localhost:5173/api/filterPosts?searchString=Prisma'

# check frontend
curl --fail 'http://localhost:5173/'

kill "$pid"
