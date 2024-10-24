# Postgres Geolocation example

This example shows how to implement **Geolocation in PostgreSQL** using [Express](https://expressjs.com/), [Postgis](http://postgis.net/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/postgis-express
__INLINE(../_setup-1.md)__
cd postgis-express
__INLINE(../_setup-2.md)__

__INLINE(./_setup-postgres.md)__

### 3. Start the REST API server

Execute this command to start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in [`index.ts`](./src/index.ts)

__INLINE(./_using-the-api.md)__

### Seeding data

Add data of your choice to the "User" and "Location" tables with the above endpoints and then run the `GET` endpoint passing the required parameters.


__INLINE(../../_next-steps.md)__
