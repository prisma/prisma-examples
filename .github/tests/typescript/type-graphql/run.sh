#!/bin/sh

set -eu

yarn start &
pid=$!

sleep 10

actual="$(curl 'http://localhost:4000/' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:4000' --data-binary '{"query":"query {\n  test\n}"}' --compressed)"

expected='{"data":{"test":"[{\"id\":1,\"email\":\"john@example.com\",\"name\":\"John Doe\"}]"}}'

if [ "$expected" != "$actual" ]; then
	echo "expected '$expected', got '$actual'"
	kill $pid
	exit 1
fi

echo "result: $actual"

kill $pid
