#!/bin/sh

set -eu

yarn
yarn prisma db push --preview-feature
yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/api/feed?searchString=Prisma'

# check frontend
curl --fail 'http://localhost:3000/'

# e2e tests
npx prisma db seed --preview-feature
npx playwright test ../../../tests/e2e/rest-nextjs/test.spec.ts

kill "$pid"
