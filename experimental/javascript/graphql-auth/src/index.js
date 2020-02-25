const { GraphQLServer } = require('graphql-yoga')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('nexus')
const { Photon } = require('@prisma/photon')
const { permissions } = require('./permissions')
const types = require('./types')

const photon = new Photon()

new GraphQLServer({
  schema: makeSchema({
    types,
    plugins: [nexusPrismaPlugin()],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
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
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#3-using-the-graphql-api`,
  ),
)
