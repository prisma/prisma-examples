# GraphQL Server Example (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with Node.js** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [Apollo Server](https://www.apollographql.com/docs/apollo-server/) and [graphql-tools](https://www.apollographql.com/docs/graphql-tools/). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-1.md)__
__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/javascript/graphql-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/javascript/graphql-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_next-steps.md)__
