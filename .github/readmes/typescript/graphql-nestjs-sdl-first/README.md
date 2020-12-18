# GraphQL Server Example with NestJS (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [NestJS](https://docs.nestjs.com/graphql/quick-start) and [graphql-tools](https://www.apollographql.com/docs/graphql-tools/). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db). The example was bootstrapped using the NestJS CLI command `nest new graphql-nestjs-sdl-first`.

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-nestjs-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-nestjs-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-nestjs-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../_start-graphql-server-nestjs.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app.md)__
__INLINE(../_next-steps.md)__