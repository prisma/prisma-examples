# GraphQL Server Example with `express-graphql` (SDL-first)

This example shows how to implement a **GraphQL server (SDL-first) with TypeScript** with the following stack:

- [**Express GraphQL**](https://github.com/graphql/express-graphql): Express middleware for GraphQL HTTP servers  
- [**`makeExecutableSchema`**](https://www.graphql-tools.com/docs/generate-schema/) from [`graphql-tools`](https://github.com/ardatan/graphql-tools): Combines [resolvers and type definitions](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e) into an executable schema.
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-express-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-express-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-express-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server-hapi.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-sdl.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
