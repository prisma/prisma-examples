const { GraphQLServer } = require('graphql-yoga')
const { schema } = require('./schema')
const { createContext } = require('./context')

new GraphQLServer({ schema, context: createContext }).start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql-sdl-first#3-using-the-graphql-api`,
  ),
)
