#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed --preview-feature
npm run dev &
pid=$!

sleep 20

npx newman run https://raw.githubusercontent.com/prisma/prisma-examples/latest/.github/tests/postman_collections/graphql-typegraphql.json -- bail

kill "$pid"
