const { GraphQLServer } = require("graphql-yoga");
const { resolvers } = require("./resolvers");
const { Prisma } = require("./generated/prisma");

const server = new GraphQLServer({
  typeDefs: "src/schema/schema.graphql",
  resolvers,
  context: req => {
    return {
      ...req,
      prisma: new Prisma()
    };
  }
});

server.start(() => console.log("Server is running on http://localhost:4000"));
