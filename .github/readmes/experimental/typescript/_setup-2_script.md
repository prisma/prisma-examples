npm install
```

### 2. Migrate your database schema & generate Prisma Client

### 2.1. Perform initial schem migration

Perform an initial schema migration against your database using the following commands:

```
npx prisma2 migrate save --name 'init' --experimental
npx prisma2 migrate up --experimental
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run Prisma 2 CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

<Details>
<Summary><b>Alternative: </b>Connect to your own database</Summary>

Prisma supports MySQL and PostgreSQL at the moment. If you would like to connect to your own database, you can do so by specifying a different data source in the [Prisma schema file](prisma/schema.prisma).

For a MySQL provider:

```prisma
datasource mysql {
    provider = "mysql"
    url      = "mysql://johndoe:secret42@localhost:3306/mydatabase"
}
```

*OR*

For a PostgreSQL provider:

```prisma
datasource postgresql {
  provider = "postgresql"
  url      = "postgresql://johndoe:secret42@localhost:5432/mydatabase?schema=public"
}
```

> **Note**: In the above example connection strings, `johndoe` would be the username to your database, `secret42` the password, `mydatabase` the name of your database, and `public` the [PostgreSQL schema](https://www.postgresql.org/docs/9.1/ddl-schemas.html).

</Details>

### 2.2. Generate Prisma Client

Run the following command to generate your Prisma Client API:

```
npx prisma2 generate
```

This generates Prisma Client into `node_modules/@prisma/client` from where it can be imported like so:

```ts
import { PrismaClient } from '@prisma/client'
```

or

```js
const { PrismaClient } = require('@prisma/client')
```