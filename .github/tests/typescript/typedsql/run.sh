#!/bin/sh

set -eu

npm install
npx prisma db push --skip-generate
npx prisma generate --sql
npm run dev
