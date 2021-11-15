# GraphQL Server Example with `fastify-graphql` (SDL-first)

This example shows how to implement a **GraphQL server (SDL-first) with TypeScript** with the following stack:

- [**Mercurius**](https://mercurius.dev/): GraphQL adapter for Fastify
- [**Fastify**](https://www.fastify.io/): Fast and low overhead web framework for building Node.js applications
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-fastify-sdl-first
__INLINE(../_setup-1.md)__
cd graphql-fastify-sdl-first
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-fastify-sdl-first
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphiql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-sdl.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
