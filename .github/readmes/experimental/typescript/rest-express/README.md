# REST API Example

This example shows how to implement a **REST API with TypeScript** using [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client).

__INLINE(../../_setup-1.md)__
cd prisma-examples/experimental/typescript/rest-express
__INLINE(../../_setup-2.md)__
__INLINE(../../_seed.md)__

### 5. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../../_using-the-rest-api.md)__

__INLINE(../../_evolving-the-app.md)__

__INLINE(../../_next-steps.md)__
