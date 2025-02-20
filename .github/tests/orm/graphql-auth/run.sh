#!/bin/sh

set -eu


export DATABASE_URL="${PPG_TEST_DATABASE_URL}"

npm install
npx prisma migrate reset --force --skip-seed
npx prisma migrate dev --name init
npx prisma db seed
npm run dev &
pid=$!

sleep 15

curl --fail 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query {\n  feed {\n    id\n    content\n    author {\n      id\n      name\n      email\n    }\n  }\n}"}' --compressed

kill "$pid"
