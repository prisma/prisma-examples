#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed --preview-feature
npm run dev &
pid=$!

sleep 20

npx newman run ../../.github/tests/postman_collections/graphql-nestjs.json --bail

kill "$pid"
