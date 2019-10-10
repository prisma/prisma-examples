import { nexusPrismaPlugin } from 'nexus-prisma'
import { Photon } from '@generated/photon'
import { makeSchema } from 'nexus'
import { GraphQLServer } from 'graphql-yoga'
import { join } from 'path'
import { permissions } from './permissions'
import * as allTypes from './resolvers'

const photon = new Photon()

const nexusPrismaTypes = nexusPrismaPlugin({
  types: allTypes,
})
const schema = makeSchema({
  types: [allTypes, nexusPrismaTypes],
  outputs: {
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
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

server.start(() => console.log(`🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#5-using-the-graphql-api`))
