# GraphQL Server Example

This example shows how to implement a **GraphQL server with TypeScript** with the following stack:

- [**GraphQL Yoga**](https://the-guild.dev/graphql/yoga-server): GraphQL server
- [**Pothos**](https://pothos-graphql.dev/): Code-first GraphQL schema definition library
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
npx try-prisma@latest --template orm/graphql
__INLINE(../_setup-1.md)__
cd graphql
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/graphql
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api.md)__

__INLINE(../_evolving-the-app-graphql-pothos.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
