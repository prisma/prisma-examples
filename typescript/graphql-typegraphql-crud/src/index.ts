import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { context } from './context'
import { resolvers } from '@generated/type-graphql'

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers,
  })

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-typegraphql-crud#using-the-graphql-api`,
    ),
  )
}

app()
