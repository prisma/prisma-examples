# GraphQL Server Example (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with TypeScript** with the following stack:

- [**Apollo Server**](https://www.apollographql.com/docs/apollo-server): HTTP server for GraphQL APIs
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-sdl.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
