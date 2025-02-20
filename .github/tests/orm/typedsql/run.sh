#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma generate --sql
npx prisma db seed
npm run start
