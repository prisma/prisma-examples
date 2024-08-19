#!/bin/sh

set -eu

npm install
npx prisma validate
npm run dev
