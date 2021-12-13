#!/bin/sh

set -eu

npm install 
npx prisma migrate dev --name init --skip-seed
npx prisma db seed
yarn test
