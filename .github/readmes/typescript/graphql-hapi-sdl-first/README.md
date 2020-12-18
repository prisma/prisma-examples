# GraphQL Server Example with Hapi (SDL first)

This example shows how to implement an **GraphQL Server Example with Hapi (SDL first)** based on [hapi](https://hapi.dev/), [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [Apollo Server Hapi](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-hapi). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-hapi-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-hapi-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-hapi-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app.md)__
__INLINE(../_next-steps.md)__
