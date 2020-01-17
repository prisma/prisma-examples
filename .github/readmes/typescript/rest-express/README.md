# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Express.JS](https://expressjs.com/de/) and [Prisma Client JS](https://photonjs.prisma.io/). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-1.md)__
cd prisma-examples/introspection-only/typescript/sqlite/rest-express
__INLINE(../_setup-2.md)__

### 2. Start the REST API server

Execute this command to start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_next-steps.md)__