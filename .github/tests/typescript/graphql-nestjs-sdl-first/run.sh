#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 30

npx newman run ../../.github/tests/postman_collections/graphql-nestjs.json --bail

kill "$pid"
