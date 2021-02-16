const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { createContext } = require('./context')

const server = new ApolloServer({ schema, context: createContext })

server
  .listen()
  .then(({ url }) =>
    console.log(
      `🚀 Server ready at: ${url}\n⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`,
    ),
  )
