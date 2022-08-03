# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Koa](https://koajs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/rest-koa
__INLINE(../_setup-1.md)__
cd rest-koa
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/rest-koa
__INLINE(../_setup-3.md)__

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_evolving-the-app-rest.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__