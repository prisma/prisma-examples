#!/bin/sh

set -eu

yarn add --dev typescript @types/react @types/node
yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/'

kill "$pid"
