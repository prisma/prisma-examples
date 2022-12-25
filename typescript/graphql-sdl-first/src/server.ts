import { ApolloServer, } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers, typeDefs } from './schema'
import { context } from './context'

const server = new ApolloServer({
  resolvers, typeDefs
})

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    context: context,
    listen: { port: 4000 }
  })

  console.log(`
  🚀 Server ready at: http://localhost:4000
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-sdl-first#using-the-graphql-api`),
  )
}

start()