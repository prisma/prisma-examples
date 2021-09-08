#!/bin/sh

set -eu

yarn 
yarn prisma db push  
yarn dev
