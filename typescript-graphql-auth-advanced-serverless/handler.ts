import { GraphQLServerLambda } from 'graphql-yoga'
import { prisma } from './src/generated/prisma-client'
import { resolvers } from './src/resolvers'
import { permissions } from './src/permissions'

const lambda = new GraphQLServerLambda({
  typeDefs: 'src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: (request: any) => ({
    ...request,
    db: prisma,
  }),
})

export const server = lambda.graphqlHandler
export const playground = lambda.playgroundHandler
