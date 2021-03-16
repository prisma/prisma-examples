# GraphQL Server Example with NestJS (SDL-first)

This example shows how to implement an **GraphQL server (SDL-first) with TypeScript** with the following stack:
- [**NestJS**](https://docs.nestjs.com/graphql/quick-start): Web framework for building scalable server-side applications
- [**graphql-tools**](https://www.apollographql.com/docs/graphql-tools/): A tool for combining resolvers and type-definitions into an executable schema 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

The example was bootstrapped using the NestJS CLI command `nest new graphql-nestjs-sdl-first`.

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-nestjs-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-nestjs-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-nestjs-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../_start-graphql-server-nestjs.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-sdl.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__