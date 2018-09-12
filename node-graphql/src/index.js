const { GraphQLServer } = require('graphql-yoga')
const { resolvers } = require('./resolvers')
const { Prisma } = require('./generated')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db: new Prisma({ debug: true }),
  },
})

server.start(() => console.log('Server is running on localhost:4000'))
