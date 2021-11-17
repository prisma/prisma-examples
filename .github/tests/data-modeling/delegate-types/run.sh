#!/bin/sh

set -eu

npm install 
npx prisma migrate dev --name init
npx prisma db seed
yarn test
