# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Express](https://expressjs.com/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).

__INLINE(../_setup-1.md)__
cd prisma-examples/experimental/typescript/rest-express
__INLINE(../_setup-2.md)__

### 4. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../../_using-the-rest-api.md)__

__INLINE(../_next-steps.md)__
