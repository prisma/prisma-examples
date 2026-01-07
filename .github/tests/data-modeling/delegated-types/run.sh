#!/bin/sh

set -eu

npm install 
npx prisma generate
npx prisma migrate dev --name init
npm run test
