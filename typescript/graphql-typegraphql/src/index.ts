import 'reflect-metadata'
import * as tq from 'type-graphql'
import { PostResolver } from './PostResolver'
import { UserResolver } from './UserResolver'
import { ApolloServer } from 'apollo-server'
import { createContext } from './context'

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [PostResolver, UserResolver],
  })

  const context = createContext()

  new ApolloServer({ schema, context }).listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`,
    ),
  )
}

app()
