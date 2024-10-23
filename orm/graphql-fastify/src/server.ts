import fastify from 'fastify'
import mercurius from 'mercurius'
import { schema } from './schema'
import { context } from './context'

const app = fastify()

app.register(mercurius, {
  schema,
  graphiql: true,
  context: () => context,
})

app.listen({ port: 4000 }, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`\
  🚀 Server ready at: http://localhost:4000/graphiql
  ⭐️ See sample queries: http://pris.ly/e/ts/graphql-fastify#using-the-graphql-api
  `)
})
