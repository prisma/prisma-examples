import { Photon } from '@generated/photon'
import { GraphQLServer } from 'graphql-yoga'
import { GraphQLSchema, GraphQLObjectType, GraphQLList } from 'graphql'
import { User } from './User'
require('dotenv').config()

const photon = new Photon()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: GraphQLList(User),
        resolve: () => {
          return photon.users()
        },
      },
    },
  }),
})

const server = new GraphQLServer({
  schema,
  context: request => {
    return {
      ...request,
      photon,
    }
  },
})

server.express.set('trust proxy', true)

server.start({ port: 8080 }, () =>
  console.log(`🚀 Server ready at: http://localhost:8080`),
)
