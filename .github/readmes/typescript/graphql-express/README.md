# GraphQL Server Example with `express-graphql`

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- [**Express GraphQL**](https://github.com/graphql/express-graphql): Express middleware for GraphQL HTTP servers   
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation 
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

## Contents

- [Getting Started](#getting-started)
- [Using the GraphQL API](#using-the-graphql-api)
- [Evolving the app](#evolving-the-app)
- [Switch to another database (e.g. PostgreSQL, MySQL, SQL Server)](#switch-to-another-database-eg-postgresql-mysql-sql-server)
- [Next steps](#next-steps)

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-express
__INLINE(../_setup-1.md)__
cd graphql-express
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/graphql-express
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server-hapi.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__

