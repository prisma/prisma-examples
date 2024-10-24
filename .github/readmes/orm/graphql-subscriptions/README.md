# Subscriptions Apollo Server + Nexus

This example shows how to implement **GraphQL subscriptions in TypeScript** with the following stack:

- [**Apollo Server**](https://github.com/apollographql/apollo-server): HTTP server for GraphQL APIs
- [**GraphQL Nexus**](https://nexusjs.org/docs/): GraphQL schema definition and resolver implementation
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

Note that **Apollo Server** includes the `PubSub` realtime component from the [`graphql-subscriptions`](https://github.com/apollographql/graphql-subscriptions) package that's needed to implement GraphQL subscriptions.

## Contents

- [Getting Started](#getting-started)
- [Using the GraphQL API](#using-the-graphql-api)
- [Switch to another database (e.g. PostgreSQL, MySQL, SQL Server)](#switch-to-another-database-eg-postgresql-mysql-sql-server)
- [Next steps](#next-steps)

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/graphql-subscriptions
__INLINE(../_setup-1.md)__
cd graphql-subscriptions
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/graphql-subscriptions
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api_subscriptions.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
