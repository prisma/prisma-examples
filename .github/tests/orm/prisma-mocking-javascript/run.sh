#!/bin/sh

set -eu

npm install
npx prisma generate

npm run test
