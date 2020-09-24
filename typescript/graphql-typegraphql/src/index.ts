import 'reflect-metadata'
import * as tq from 'type-graphql'
import { PostResolver } from './PostResolver'
import { UserResolver } from './UserResolver'
import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [PostResolver, UserResolver],
  })

  const context = createContext()

  new GraphQLServer({ schema, context }).start(() =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️  See sample queries: http://pris.ly/e/ts/graphql-typegraphql#using-the-graphql-api`,
    ),
  )
}

app()
