# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [graphql-yoga](https://github.com/prisma/graphql-yoga) and [GraphQL Nexus](https://nexus.js.org/).

[![Edit graphql](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/prisma/prisma-examples/tree/prisma2/typescript/graphql?fontsize=14)

__INLINE(../_setup-1.md)__
cd prisma-examples/experimental/typescript/graphql
__INLINE(../_setup-2.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../../_using-the-graphql-api.md)__

### 6. Changing the GraphQL schema

To make changes to the GraphQL schema, you need to manipulate the `Query` and `Mutation` types that are defined in [`schema.ts`](./src/schema.ts). 

Note that the [`dev`](./package.json#L4) script also starts a development server that automatically updates your schema every time you save a file. This way, the auto-generated [GraphQL schema](./schema.graphql) updates whenever you make changes in to the `Query` or `Mutation` types inside your TypeScript code.

__INLINE(../_next-steps.md)__
