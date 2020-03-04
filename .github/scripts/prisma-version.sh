#!/bin/sh

set -eu

channel="$1"

yarn info "prisma2@$channel" --json | jq ".data[\"dist-tags\"].$channel" | tr -d '"'
