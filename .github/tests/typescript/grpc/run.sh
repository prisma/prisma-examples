#!/bin/sh

set -eu

yarn dev &
pid=$!

sleep 10

npm run feed

kill "$pid"
