import { ApolloServer } from 'apollo-server-hapi';
import * as  Hapi from '@hapi/hapi';
import { schema } from './schema';
import { createContext } from './context';

async function startServer() {
    const server = new ApolloServer({ schema, context: createContext })

    const app = Hapi.server({
        port: 4000
    });

    await server.applyMiddleware({ app })
    await server.installSubscriptionHandlers(app.listener)
    await app.start()
}

startServer()
    .then((server) => {
        console.log(`🚀 Server ready at: http://localhost:4000`)
    })
    .catch(err => console.log(err))
