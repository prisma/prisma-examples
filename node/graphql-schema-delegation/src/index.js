const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { prismaBinding } = require('./prisma-binding')
const { resolvers } = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    binding: prismaBinding,
    db: prisma,
  },
})

server.start(() => console.log('Server is running on localhost:4000'))
