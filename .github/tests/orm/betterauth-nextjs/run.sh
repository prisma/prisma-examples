#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run dev &
pid=$!

sleep 15

# check frontend
curl --fail 'http://localhost:3000/'

kill "$pid"
