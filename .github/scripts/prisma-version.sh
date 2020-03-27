#!/bin/sh

set -eu

channel="$1"

yarn info "@prisma/cli@$channel" --json | jq ".data[\"dist-tags\"].$channel" | tr -d '"'
