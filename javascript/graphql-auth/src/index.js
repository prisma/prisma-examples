const { GraphQLServer } = require('graphql-yoga')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('nexus')
const { Photon } = require('@generated/photon')
const { permissions } = require('./permissions')
const types = require('./types')

const photon = new Photon()

new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
  }),
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      photon,
    }
  },
}).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#5-using-the-graphql-api`,
  ),
)
