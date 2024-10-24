# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Fastify](https://www.fastify.io/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). The example uses an SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/rest-fastify
__INLINE(../_setup-1.md)__
cd rest-fastify
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/rest-fastify
__INLINE(../_setup-3.md)__

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_evolving-the-app-rest.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
