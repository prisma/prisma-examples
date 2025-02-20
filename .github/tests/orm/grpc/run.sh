#!/bin/sh

set -eu

export DATABASE_URL="${PPG_TEST_DATABASE_URL}"

npm install
npx prisma migrate reset --force --skip-seed
npx prisma migrate dev --name init
npx prisma db seed
npm run dev &
pid=$!


sleep 10

npm run feed

kill "$pid"
