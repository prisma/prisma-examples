#!/bin/sh

set -eu

# Check if DATABASE_URL is set
if [ -z "${PPG_TEST_DATABASE_URL:-}" ]; then
  echo "Error: DATABASE_URL environment variable is not set."
  exit 1
fi

npm install
npm run test
