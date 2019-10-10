const { GraphQLServer } = require('graphql-yoga')
const { Photon } = require('@generated/photon')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('nexus')
const { join } = require('path')
const allTypes = require('./resolvers')

const photon = new Photon()

const nexusPrismaTypes = nexusPrismaPlugin({
  types: allTypes,
})
const schema = makeSchema({
  types: [allTypes, nexusPrismaTypes],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
  },
})

const server = new GraphQLServer({
  schema,
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
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-auth#5-using-the-graphql-api`,
  ),
)
