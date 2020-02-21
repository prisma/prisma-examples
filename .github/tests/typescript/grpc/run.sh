#!/bin/sh

set -eu

set +e
yarn dev &
pid=$!
set -e

sleep 10

npm run feed

kill "$pid"
