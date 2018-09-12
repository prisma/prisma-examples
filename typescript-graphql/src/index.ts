import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from './resolvers'
import { Prisma } from './prisma-client'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db: new Prisma({ debug: true }),
  },
} as any)

server.start(() => console.log('Server is running on localhost:4000'))
