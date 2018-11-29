# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** based on Prisma, [graphql-yoga](https://github.com/prisma/graphql-yoga) and [graphqlgen](https://github.com/prisma/graphqlgen).

__INLINE(../_setup-1.md)__
cd prisma-examples/typescript/graphql
__INLINE(../_setup-2.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

### 6. Changing the GraphQL schema

After you made changes to `schema.graphql`, you need to update the generated types in `./src/generated/graphqlgen.ts` and potentially also adjust the resolver implementations in `./src/resolvers`:

```
yarn generate
```

This invoked [`graphqlgen`](https://github.com/prisma/graphqlgen) and updates `./src/generated/graphqlgen.ts` to incorporate the schema changes in your TS type definitions. It also generates scaffolded resolvers in `./src/generated/tmp/resolvers` that you might need to copy and paste into `./src/resolvers`. 

__INLINE(../_next-steps.md)__