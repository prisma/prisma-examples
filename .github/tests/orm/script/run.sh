#!/bin/sh

set -eu

export DATABASE_URL="${PPG_TEST_DATABASE_URL}"

npm install
npx prisma migrate reset --force --skip-seed
npx prisma migrate dev --name init
npm run dev
