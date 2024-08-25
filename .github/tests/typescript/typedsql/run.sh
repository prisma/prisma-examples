#!/bin/sh

set -eu

npm install
npm run dbpush
npm run generate
npm run dev
