#!/bin/sh

set -eu

# TODO: remove this line eventually, was added to make tests work but really shouldn't be needed?!
yarn add --dev typescript @types/react @types/node

yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/'

kill "$pid"
