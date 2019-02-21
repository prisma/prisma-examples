import { GraphQLServer } from 'graphql-yoga'
import { makePrismaSchema, prismaObjectType } from 'nexus-prisma'
import * as path from 'path'
import datamodelInfo from './generated/nexus-prisma'
import { prisma } from './generated/prisma-client'

const User = prismaObjectType({
  name: 'User',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const Post = prismaObjectType({
  name: 'Post',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['*'])
  },
})

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['*'])
  }
})

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [Query, Mutation, User, Post],

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma,
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false,
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, './types.ts'),
        alias: 'types',
      },
    ],
    contextType: 'types.Context',
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma },
})

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
