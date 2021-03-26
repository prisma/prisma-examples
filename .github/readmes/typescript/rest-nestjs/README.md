# REST API Example

This example shows how to implement a **REST API** using [NestJS](https://docs.nestjs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db). The example was bootstrapped using the NestJS CLI command `nest new rest-nestjs`.

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/rest-nestjs
__INLINE(../_setup-1.md)__
cd rest-nestjs
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/rest-nestjs
__INLINE(../_setup-3.md)__

### 3. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

__INLINE(../../_using-the-rest-api.md)__

__INLINE(../_evolving-the-app-rest-nestjs.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
