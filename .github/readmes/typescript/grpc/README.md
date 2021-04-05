# gRPC Server Example

This example shows how to implement a **gRPC API with TypeScript** and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/grpc
__INLINE(../_setup-1.md)__
cd grpc
__INLINE(../_setup-2.md)__
cd prisma-examples/typescript/grpc
__INLINE(../_setup-3.md)__

### 2. Start the gRPC server

Execute this command to start the gRPC server:

```
npm run dev
```

The server is now running on `0.0.0.0:50051`. 

### 3. Using the gRPC API

To use the gRPC API, you need a gRPC client. We provide several client scripts inside the [`./client`](./client) directory. Each script is named according to the operation it performs against the gRPC API (e.g. the [`feed.js`](./client/feed.js) script sends the [`Feed`](./service.proto#L7) operation). Each script can be invoked by running the corresponding NPM script defined in [`package.json`](./package.json), e.g. `npm run feed`.

In case you prefer a GUI client, we recommend [BloomRPC](https://github.com/uw-labs/bloomrpc):

![](https://imgur.com/0EiIo03.png)

__INLINE(../_evolving-the-app.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__