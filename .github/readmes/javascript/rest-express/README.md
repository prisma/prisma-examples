# REST API Example

This example shows how to implement a **REST API** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/javascript/rest-express
__INLINE(../_setup-1.md)__
cd rest-express
__INLINE(../_setup-2.md)__
cd prisma-examples/javascript/rest-express
__INLINE(../_setup-3.md)__

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_evolving-the-app-rest.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
