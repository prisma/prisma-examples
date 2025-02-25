#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma generate --sql
npm run test
