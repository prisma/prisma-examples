#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed &
pid=$!

sleep 10

npm run test

kill "$pid"

