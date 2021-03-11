import { ApolloServer } from 'apollo-server-hapi'
import Hapi from '@hapi/hapi'
import { schema } from './schema'
import { context } from './context'

async function StartServer() {
  const server = new ApolloServer({ schema, context: context })

  const app = Hapi.server({
    port: 4000,
  })

  await server.applyMiddleware({ app })
  await server.installSubscriptionHandlers(app.listener)
  await app.start()
}

StartServer()
  .then((server) => {
    console.log(`
🚀 Server ready at: http://localhost:4000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-hapi-sdl-first#using-the-graphql-api
`)
  })
  .catch((err) => console.log(err))
