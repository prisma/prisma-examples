import { GraphQLServer } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { Prisma } from "./generated/prisma";

const server = new GraphQLServer({
  typeDefs: "src/schema/schema.graphql",
  resolvers,
  context: req => {
    return {
      ...req,
      db: new Prisma()
    };
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
