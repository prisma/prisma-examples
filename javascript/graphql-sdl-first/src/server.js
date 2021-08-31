const { ApolloServer } = require('apollo-server')
const { typeDefs, resolvers } = require('./schema')
const { context } = require('./context')

const server = new ApolloServer({ typeDefs, resolvers, context: context })

server.listen().then(({ url }) =>
  console.log(`
🚀 Server ready at: ${url}
⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#using-the-graphql-api`),
)
