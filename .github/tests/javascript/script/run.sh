#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npm run dev 
