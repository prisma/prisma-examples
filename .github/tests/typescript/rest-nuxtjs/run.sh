#!/bin/sh

set -eu

npm install 
npx prisma migrate dev --name init
npm run dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/users/getAll'

# check frontend
curl --fail 'http://localhost:3000/'

kill "$pid"
