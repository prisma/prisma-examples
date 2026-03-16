import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
// graphql-ws v6 ships this subpath through package exports, but TS's legacy node
// resolution in this example can't see the declaration without a broader tsconfig change.
// @ts-expect-error compile against the runtime-resolved export path
import { useServer } from 'graphql-ws/use/ws';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { Context, context } from './context';
import { schema } from './schema';

const PORT = process.env.PORT || 4000

const app = express()
const httpServer = createServer(app)

async function start() {
  /** Create WS Server */
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  /** hand-in created schema and have the WS Server start listening */
  const serverCleanup = useServer({ schema, context }, wsServer)

  const server = new ApolloServer<Context>({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()
  app.use('/graphql', cors<cors.CorsRequest>(), express.json(), expressMiddleware(server, { context: async () => context }));

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`)
    console.log(`⏰ Subscriptions ready at http://localhost:${PORT}/graphql`)
    console.log(
      `⭐️ See sample queries: http://pris.ly/e/ts/graphql-subscriptions#using-the-graphql-api`,
    )
  })
}

start()
