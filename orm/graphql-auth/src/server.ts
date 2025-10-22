import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { Context, createContext } from './context'
import { schema } from './schema'

const server = new ApolloServer<Context>({ schema })

startStandaloneServer(server, {
  context: createContext
}).then(({ url }) => {
  console.log(`\
    🚀 Server ready at: ${url}
    ⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#using-the-graphql-api`,
  );
})
