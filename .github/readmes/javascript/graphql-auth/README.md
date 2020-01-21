# GraphQL Server with Authentication & Permissions

> ⚠️ This example is currently broken due to the breaking changes in the [`preview020`](https://github.com/prisma/prisma2/releases/tag/2.0.0-preview020) release. We are already in the process of fixing it, so it will be available very soon again.

This example shows how to implement a **GraphQL server with an email-password-based authentication workflow and authentication rules** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [graphql-yoga](https://github.com/prisma/graphql-yoga) & [graphql-shield](https://github.com/maticzav/graphql-shield). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-1.md)__
cd prisma-examples/javascript/graphql-auth
__INLINE(../_setup-2.md)__

__INLINE(../_start-graphql-server.md)__

__INLINE(../../_using-the-graphql-api-auth.md)__

__INLINE(../_next-steps-graphql.md)__
