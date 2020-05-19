import { config } from 'dotenv'
config()

import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

const PORT = process.env.PORT || 4000

const server = new ApolloServer({
  schema,
  context: createContext,
  playground: true,
  cors: true,
})

server.listen({ port: PORT }).then(({ url, subscriptionsUrl }) => {
  console.log(`🚀 Server ready at ${url}`)
  console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`)
})
