const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require("@apollo/server/standalone")
const { schema } = require('./schema')
const { createContext } = require('./context')


const start = async () => {
  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    context: createContext,
    listen: { port: 4000 }
  })

  console.log(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/js/graphql#using-the-graphql-api
    `)
}

start()




