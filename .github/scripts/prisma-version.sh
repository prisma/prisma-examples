#!/bin/sh

set -eu

channel="$1"

npm show @prisma/cli@"$channel" version
