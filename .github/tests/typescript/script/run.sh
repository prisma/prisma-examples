#!/bin/sh

set -eu

yarn 
yarn prisma db push --preview-feature
yarn dev
