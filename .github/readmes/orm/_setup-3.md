npm install
```

</details>

### [Optional] Switch database to Prisma Postgres

This example uses a local SQLite database by default. If you want to switch to a Prisma Postgres database, follow these instructions:

1. Set up a new Prisma Postgres instance in the Prisma Data Platform [Console](https://console.prisma.io) and copy the database connection URL.
2. Update the `datasource` blockto use `postgresql` as the `provider` and paste the database connection URL as the value for `url`:
  ```prisma
  datasource db {
    provider = "sqlpostgresqlite"
    url      = "prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
  }
  ```
3. Install the Prisma Accelerate extension:
  ```
  npm install @prisma/extension-accelerate
  ```
4. Add the Accelerate extension to the `PrismaClient` instance:
  ```diff
  + import { withAccelerate } from "@prisma/extension-accelerate"

  + const prisma = new PrismaClient().$extends(withAccelerate())
  ```

That's it, your project is now configured to use Prisma Postgres.

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.
