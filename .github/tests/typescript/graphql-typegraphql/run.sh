#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 20

npx newman run ../../.github/tests/postman_collections/graphql-typegraphql.json -- bail

kill "$pid"
