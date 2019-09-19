const { GraphQLServer } = require('graphql-yoga')

const { Photon } = require('@generated/photon')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')

const photon = new Photon()

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      photon,
    }
  },
})

server.start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#6-using-the-graphql-api`,
  ),
)
