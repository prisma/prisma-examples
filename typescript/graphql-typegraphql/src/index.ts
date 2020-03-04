import "reflect-metadata";
import * as tq from "type-graphql"
import { PostResolvers } from "./PostResolvers"
import  { UserResolvers } from "./UserResolvers"
import { GraphQLServer } from 'graphql-yoga'
import { createContext } from "./context";

const app = async () => {

    const schema = await tq.buildSchema({
        resolvers: [PostResolvers, UserResolvers]
    });

    const context = createContext();

    new GraphQLServer({ schema, context }).start(() =>
        console.log(
            `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql#3-using-the-graphql-api`,
        ),
    )
}

app();

