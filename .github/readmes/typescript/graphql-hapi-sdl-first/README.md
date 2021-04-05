# GraphQL Server Example with Hapi (SDL first)

This example shows how to implement an **GraphQL Server Example with Hapi (SDL first)** with the following stack:

- [**hapi**](https://hapi.dev/): Web framework with a focus on security and scalability
- [**Apollo Server Hapi**](https://github.com/apollographql/apollo-server/tree/main/packages/apollo-server-hapi): Apollo Server integration for Hapi
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-hapi-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-hapi-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-hapi-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server-hapi.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-sdl.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
