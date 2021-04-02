#!/bin/sh

set -eu

npm install
npx prisma migrate dev --name init
npx prisma db seed --preview-feature
npm run dev &
pid=$!

sleep 15

npx newman run https://gist.githubusercontent.com/ruheni/3467b4dc135e537d422e5f0f0f80e602/raw/7b586cccb18d6577eb4ccd12d1d13c09c267db50/prisma-examples-rest.postman_collection.json --bail

kill "$pid"
