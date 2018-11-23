import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import { resolvers } from './resolvers'
import { permissions } from './permissions'

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers: resolvers as any,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      db: prisma,
    }
  },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
