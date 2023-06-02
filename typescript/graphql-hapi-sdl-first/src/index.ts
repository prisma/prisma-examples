import { ApolloServer, BaseContext } from '@apollo/server'
import hapiApollo from "@as-integrations/hapi"
import { Server } from '@hapi/hapi'
import { resolvers, typeDefs } from './schema'
import { context } from './context'

async function StartServer() {
  const apollo = new ApolloServer<BaseContext>({
    typeDefs,
    resolvers,
  })

  await apollo.start()

  const app = new Server({
    port: 4000,
  })

  await app.register({
    plugin: hapiApollo,
    options: {
      path: '/graphql',
      context: async () => (context),
      apolloServer: apollo,
    }
  });
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
