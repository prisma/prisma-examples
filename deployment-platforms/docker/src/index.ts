import Photon from '@generated/photon'
import { makeSchema } from '@prisma/nexus'
import { GraphQLServer } from 'graphql-yoga'
import express, { Request, Response, RequestHandler } from 'express'

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const photon = new Photon()

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      users: {
        type: GraphQLString,
        resolve() {
          return 'world'
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
  console.log(`🚀 Server ready at http://localhost:8080`),
)
