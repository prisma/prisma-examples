import { ApolloServer } from 'apollo-server-hapi'
import * as Hapi from '@hapi/hapi'
import { schema } from './schema'
import { context } from './context'

async function startServer() {
  const server = new ApolloServer({
    schema,
    context,
  })

  const app = Hapi.server({
    port: 4000,
  })

  await server.start()
  await server.applyMiddleware({ app })
  await app.start()
}

startServer()
  .then(() => {
    console.log(`\
🚀 Server ready at: http://localhost:4000/graphql
⭐️ See sample queries: http://pris.ly/e/ts/graphql-hapi#using-the-graphql-api
`)
  })
  .catch((err) => console.log(err))
