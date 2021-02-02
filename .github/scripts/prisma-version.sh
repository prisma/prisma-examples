#!/bin/sh

set -eu

channel="$1"

npm show prisma@"$channel" version
