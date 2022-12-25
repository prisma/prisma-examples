import { ApolloServer, } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema'
import { context } from './context'

const server = new ApolloServer({
  schema
})

const start = async () => {
  const { url } = await startStandaloneServer(server, {
    context: context,
    listen: { port: 4000 }
  })

  console.log(`\
  🚀 Server ready at: ${url}
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-nexus#using-the-graphql-api
  `)
}

start()