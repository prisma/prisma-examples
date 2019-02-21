#!/bin/bash

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
cp ./node/grpc/prisma.yml ../../node/grpc/prisma

# Node (seeding)
cp ./node/seed.js ../../node/graphql/prisma
cp ./node/graphql-auth/seed.js ../../node/graphql-auth/prisma
cp ./node/graphql-subscriptions/seed.js ../../node/graphql-subscriptions/prisma
cp ./node/seed.js ../../node/rest-express/prisma
cp ./node/seed.js ../../node/script/prisma
cp ./node/grpc/seed.js ../../node/grpc/prisma
cp ./node/cli-app/seed.js ../../node/cli-app/prisma
cp ./node/mongo/seed.js ../../node/docker-mongodb/prisma
cp ./node/mysql-and-postgres/seed.js ../../node/docker-mysql/prisma
cp ./node/mysql-and-postgres/seed.js ../../node/docker-postgres/prisma

# TypeScript (prisma.yml)
cp ./typescript/prisma.yml ../../typescript/cli-app/prisma
cp ./typescript/graphql/prisma.yml ../../typescript/graphql/prisma
cp ./typescript/graphql/prisma.yml ../../typescript/graphql-crud/prisma
cp ./typescript/graphql-auth/prisma.yml ../../typescript/graphql-auth/prisma
cp ./typescript/prisma.yml ../../typescript/graphql-subscriptions/prisma
cp ./typescript/prisma.yml ../../typescript/script/prisma
cp ./typescript/mongo/prisma.yml ../../typescript/docker-mongodb/prisma
cp ./typescript/mysql-and-postgres/prisma.yml ../../typescript/docker-mysql/prisma
cp ./typescript/mysql-and-postgres/prisma.yml ../../typescript/docker-postgres/prisma
cp ./typescript/grpc/prisma.yml ../../typescript/grpc/prisma

# TypeScript (tsconfig.json)
cp ./typescript/tsconfig.json ../../typescript/cli-app
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql
mv ../../typescript/graphql/tsconfig-graphql.json ../../typescript/graphql/tsconfig.json
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql-crud
mv ../../typescript/graphql-crud/tsconfig-graphql.json ../../typescript/graphql-crud/tsconfig.json
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql-auth
mv ../../typescript/graphql-auth/tsconfig-graphql.json ../../typescript/graphql-auth/tsconfig.json
cp ./typescript/tsconfig-graphql.json ../../typescript/graphql-subscriptions
mv ../../typescript/graphql-subscriptions/tsconfig-graphql.json ../../typescript/graphql-subscriptions/tsconfig.json
cp ./typescript/tsconfig.json ../../typescript/script
cp ./typescript/tsconfig.json ../../typescript/docker-mongodb
cp ./typescript/tsconfig.json ../../typescript/docker-mysql
cp ./typescript/tsconfig.json ../../typescript/docker-postgres
cp ./typescript/tsconfig.json ../../typescript/grpc

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