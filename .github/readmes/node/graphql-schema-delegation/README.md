# GraphQL Server with Schema Delegation Example

This example shows how to implement a **GraphQL server with schema delegation** based on [graphql-yoga](https://github.com/prisma/graphql-yoga) and [prisma-binding](https://github.com/prisma/prisma-binding).

__INLINE(../_setup-1.md)__
cd prisma-examples/node/graphql-schema-delegation
__INLINE(../_setup-2.md)__

Now **copy the HTTP endpoint of your Prisma API** that's printed to the console and paste it into `index.js`, replacing the placeholder `__YOUR_PRISMA_ENDPOINT__` where the `GraphQLServer` is instantiated. (You can also find the endpoint in your `prisma.yml`.)

Here's an example of what the code could look like after the placeholder was replaced:

```js
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma: new Prisma({
      typeDefs: './src/generated/prisma.graphql',
      endpoint: 'https://us1.prisma.sh/jane-doe/prisma/dev',
    }),
  }
})
```

__INLINE(../_start-graphql-server.md)__