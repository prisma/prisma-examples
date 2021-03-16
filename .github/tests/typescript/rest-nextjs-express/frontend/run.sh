#!/bin/sh

set -eu

yarn
yarn dev &
pid=$!

sleep 15

curl --fail 'http://localhost:3000/'

kill "$pid"
