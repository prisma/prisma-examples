#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma migrate reset -f
npm run dev &
pid=$!

sleep 20

npx newman run ../../.github/tests/postman_collections/graphql.json --bail

kill "$pid"
