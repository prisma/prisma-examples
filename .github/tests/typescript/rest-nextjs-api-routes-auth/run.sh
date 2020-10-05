#!/bin/sh

set -eu

yarn dev &
pid=$!

sleep 15

# check frontend
curl --fail 'http://localhost:3000/'

kill "$pid"
