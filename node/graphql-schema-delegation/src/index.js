const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./prisma-binding')
const { resolvers } = require('./resolvers')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
})

server.start(() => console.log('Server is running on http://localhost:4000'))
