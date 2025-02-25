#!/bin/sh

set -eu

# Check if DATABASE_URL is set
if [ -z "${PPG_TEST_DATABASE_URL:-}" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

export DATABASE_URL="${PPG_TEST_DATABASE_URL}"

npm install
npx prisma migrate reset --force --skip-seed
npx prisma migrate dev --name init
npx prisma db seed
npm run test
