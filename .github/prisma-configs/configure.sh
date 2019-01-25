#!/bin/bash

# GO_EXAMPLE_COUNT=4
 
# message="Hello World"
# echo $message

# for number in {1..10}; do
#     echo $number
# done

# Node
cp ./node/prisma.yml ../../node/cli-app/prisma
cp ./node/prisma.yml ../../node/graphql/prisma
cp ./node/prisma.yml ../../node/graphql-auth/prisma
cp ./node/prisma.yml ../../node/graphql-subscriptions/prisma
cp ./node/prisma.yml ../../node/rest-express/prisma
cp ./node/prisma.yml ../../node/script/prisma
cp ./node/mongo/prisma.yml ../../node/docker-mongodb/prisma
cp ./node/mysql-and-postgres/prisma.yml ../../node/docker-mysql/prisma
cp ./node/mysql-and-postgres/prisma.yml ../../node/docker-postgres/prisma

# TypeScript (prisma.yml)
cp ./typescript/prisma.yml ../../typescript/cli-app/prisma
cp ./typescript/nexus/prisma.yml ../../typescript/graphql/prisma
cp ./typescript/nexus/prisma.yml ../../typescript/graphql-auth/prisma
cp ./typescript/prisma.yml ../../typescript/graphql-subscriptions/prisma
cp ./typescript/prisma.yml ../../typescript/script/prisma
cp ./typescript/mongo/prisma.yml ../../typescript/docker-mongodb/prisma
cp ./typescript/mysql-and-postgres/prisma.yml ../../typescript/docker-mysql/prisma
cp ./typescript/mysql-and-postgres/prisma.yml ../../typescript/docker-postgres/prisma

# TypeScript (tsconfig.json)
cp ./typescript/tsconfig.json ../../typescript/cli-app
cp ./typescript/tsconfig.json ../../typescript/graphql
cp ./typescript/tsconfig.json ../../typescript/graphql-auth
cp ./typescript/tsconfig.json ../../typescript/graphql-subscriptions
cp ./typescript/tsconfig.json ../../typescript/script
cp ./typescript/tsconfig.json ../../typescript/docker-mongodb
cp ./typescript/tsconfig.json ../../typescript/docker-mysql
cp ./typescript/tsconfig.json ../../typescript/docker-postgres

# TypeScript (graphqlgen)
cp ./typescript/graphqlgen.yml ../../typescript/graphql-subscriptions

# Flow (prisma.yml)
cp ./flow/prisma.yml ../../flow/graphql/prisma
cp ./flow/prisma.yml ../../flow/script/prisma

# Flow (.flowconfig)
cp ./flow/.flowconfig ../../flow/graphql
cp ./flow/.flowconfig ../../flow/script

# Go
cp ./go/prisma.yml ../../go/cli-app/prisma
cp ./go/prisma.yml ../../go/graphql/prisma
cp ./go/prisma.yml ../../go/http-mux/prisma
cp ./go/prisma.yml ../../go/rest-gin/prisma
cp ./go/prisma.yml ../../go/script/prisma
cp ./go/mongo/prisma.yml ../../go/docker-mongodb/prisma
cp ./go/mysql-and-postgres/prisma.yml ../../go/docker-mysql/prisma
cp ./go/mysql-and-postgres/prisma.yml ../../go/docker-postgres/prisma