import { ApolloServer } from 'apollo-server'
import { schema } from './schema'
import { createContext } from './context'

const server = new ApolloServer({ schema, context: createContext })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#using-the-graphql-api`)
})

