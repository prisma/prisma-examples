# GraphQL Server Example

This example shows how to **implement a GraphQL server with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [apollo-server](https://www.apollographql.com/docs/apollo-server). It is based on a SQLite database - you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/graphql-typegraphql-crud
__INLINE(../_setup-1.md)__
cd graphql-typegraphql-crud
npm install --legacy-peer-deps
```

> Note: The `--legacy-peer-deps` flag installs the Prisma version that is compatible with `typegraphql-prisma` as a peer dependency. Refer to [`typegraphql-prisma`'s releases](https://github.com/MichalLytek/typegraphql-prisma/releases) to check the Prisma version that's compatible with the latest `typegraphql-prisma` version.

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/graphql-typegraphql-crud
__INLINE(../_setup-3.md)__

__INLINE(../../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api-typegraphql-crud.md)__

__INLINE(../_evolving-the-app-typegraphql.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
