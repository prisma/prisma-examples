const { ApolloServer } = require('apollo-server')
const { schema } = require('./schema')
const { createContext } = require('./context')

new ApolloServer({ schema, context: createContext }).listen(
  { port: 4000 },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-apollo-server#3-using-the-graphql-api`,
    ),
)
