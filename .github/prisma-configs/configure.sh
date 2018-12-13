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
cp ./node/without-client/prisma.yml ../../node/graphql-schema-delegation/prisma
cp ./node/prisma.yml ../../node/graphql-subscriptions/prisma
cp ./node/prisma.yml ../../node/rest-express/prisma
cp ./node/prisma.yml ../../node/script/prisma
cp ./node/mongo/prisma.yml ../../node/docker-mongodb/prisma

# TypeScript (prisma.yml)
cp ./typescript/prisma.yml ../../typescript/cli-app/prisma
cp ./typescript/prisma.yml ../../typescript/graphql/prisma
cp ./typescript/prisma.yml ../../typescript/graphql-auth/prisma
cp ./typescript/prisma.yml ../../typescript/graphql-subscriptions/prisma
cp ./typescript/prisma.yml ../../typescript/script/prisma
cp ./typescript/mongo/prisma.yml ../../typescript/docker-mongodb/prisma

# TypeScript (tsconfig.json)
cp ./typescript/tsconfig.json ../../typescript/cli-app
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql
mv ../../typescript/graphql/tsconfig-graphql.json ../../typescript/graphql/tsconfig.json
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql-auth
mv ../../typescript/graphql-auth/tsconfig-graphql.json ../../typescript/graphql-auth/tsconfig.json
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql-subscriptions
mv ../../typescript/graphql-subscriptions/tsconfig-graphql.json ../../typescript/graphql-subscriptions/tsconfig.json
cp ./typescript/tsconfig.json ../../typescript/script
cp ./typescript/tsconfig.json ../../typescript/docker-mongodb

# TypeScript (graphqlgen)
cp ./typescript/graphqlgen.yml ../../typescript/graphql
cp ./typescript/graphqlgen.yml ../../typescript/graphql-auth
cp ./typescript/graphqlgen.yml ../../typescript/graphql-subscriptions

# Flow (prisma.yml)
cp ./flow/prisma.yml ../../flow/graphql/prisma
cp ./flow/prisma.yml ../../flow/script/prisma

# Flow (.flowconfig)
cp ./flow/.flowconfig ../../flow/graphql
cp ./flow/.flowconfig ../../flow/script
\

# Go
cp ./go/prisma.yml ../../go/cli-app/prisma
cp ./go/prisma.yml ../../go/graphql/prisma
cp ./go/prisma.yml ../../go/http-mux/prisma
cp ./go/prisma.yml ../../go/rest-gin/prisma
cp ./go/prisma.yml ../../go/script/prisma