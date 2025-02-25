#!/bin/sh

set -eu

npm install 
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 15

# check frontend
curl --fail 'http://localhost:5173/'

kill "$pid"
