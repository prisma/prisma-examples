#!/bin/sh

set -eu

yarn 
yarn prisma db push --preview-feature
yarn dev &
pid=$!

sleep 15

# check frontend
curl --fail 'http://localhost:3000/'

kill "$pid"
