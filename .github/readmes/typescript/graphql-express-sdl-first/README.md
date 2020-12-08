# GraphQL Server Example with `express-graphql` (SDL-first)

This example shows how to implement a **GraphQL server (SDL-first) with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [express-graphql](https://github.com/graphql/express-graphql) and [`makeExecutableSchema`](https://www.graphql-tools.com/docs/generate-schema/) from [`graphql-tools`](https://github.com/ardatan/graphql-tools). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-express-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-express-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-express-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql.md)__
__INLINE(../_next-steps.md)__
