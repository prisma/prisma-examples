# GraphQL Apollo Server Example

> ⚠️ This example is currently broken due to the breaking changes in the [`preview020`](https://github.com/prisma/prisma2/releases/tag/2.0.0-preview020) release. We are already in the process of fixing it, so it will be available very soon again.

This example shows how to implement a **GraphQL server with TypeScript** based on  [Prisma Client JS](https://photonjs.prisma.io/), [apollo-server](https://www.apollographql.com/docs/apollo-server/) and [GraphQL Nexus](https://nexus.js.org/).

__INLINE(../_setup-1.md)__
cd prisma-examples/typescript/graphql-apollo-server
__INLINE(../_setup-2.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

### 6. Changing the GraphQL schema

To make changes to the GraphQL schema, you need to manipulate the `Query` and `Mutation` types that are defined in [`schema.ts`](./src/schema.ts). 

Note that the [`dev`](./package.json#L6) script also starts a development server that automatically updates your schema every time you save a file. This way, the auto-generated [GraphQL schema](./src/schema.graphql) updates whenever you make changes in to the `Query` or `Mutation` types inside your TypeScript code.

__INLINE(../_next-steps-graphql.md)__