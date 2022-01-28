# CockroachDB example

This example shows how to connect Prisma to a CockroachDB database, create the database schema with raw SQL, use introspection to populate the Prisma schema and use [Prisma Client](https://www.prisma.io/client) in a TypeScript script to read and write data in the database.

> **Note:** CockroachDB support in Prisma is currently in **Preview** and doesn't support Prisma Migrate. For this reason, the database schema is created with raw SQL.

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/script.ts`: Node.js script with queries similar to the ones in the test.

## Prerequisites

- Node.js installed.
- [CockroachDB installed](https://www.cockroachlabs.com/docs/v21.2/install-cockroachdb.html) so you can run CockroachDB locally and use the CockroachDB client (interactive shell) .

> **Note:** You can also conect to a [free CockroachDB Serverless Cluster](https://www.cockroachlabs.com/docs/cockroachcloud/create-a-serverless-cluster.html), however, this requires setting up a root certificate. For simplicity, this example relies on a local single-node CockroachDB server.

## 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/cockroachdb
npm install
```

## 2. Start a CockroachDB database server locally

Run the following command from the `cockroachdb` folder to start a local CockroachDB node:

```sh
cockroach start-single-node --insecure --advertise-host localhost
```

You should see the following output once the CockroachDB started:

```
CockroachDB node starting at 2022-01-25 09:45:28.105611 +0000 UTC (took 1.7s)
build:               CCL v21.2.4 @ 2022/01/10 18:53:16 (go1.16.6)
webui:               http://localhost:8080
sql:                 postgresql://root@localhost:26257/defaultdb?sslmode=disable
sql (JDBC):          jdbc:postgresql://localhost:26257/defaultdb?sslmode=disable&user=root
RPC client flags:    cockroach <client cmd> --host=localhost:26257 --insecure
logs:                /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/logs
temp dir:            /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/cockroach-temp960221969
external I/O path:   /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/extern
store[0]:            path=/Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data
storage engine:      pebble
status:              restarted pre-existing node
clusterID:           dfa695a0-22e5-4356-8132-449169688432
nodeID:              1
```

## 3. Create the database schema with the included SQL

You will create the database schema using the [`dbinit.sql`](./dbinit.sql) file included in the repository.

Run the following command from the `cockroachdb` folder:

```
cockroach sql --insecure -f dbinit.sql
```

The script will create the `prisma` database and create three tables.

You should see the following output:

```
CREATE DATABASE
Time: 116ms
SET
Time: 83ms
CREATE TABLE
Time: 183ms
CREATE TABLE
Time: 524ms
CREATE TABLE
Time: 569m
```

## 4. Configure the database connection URL

Prisma will use the `DATABASE_URL` environment variable in `.env` in the `cockroachdb` folder to connect to the database.

Create the file:

```sh
touch .env
```

Then add the following line:

```
DATABASE_URL=postgresql://root@localhost:26257/prisma?sslmode=disable
```

## 5. Introspect the database

In this step, you will use the `prisma db pull` command to introspect your database and populate the Prisma schema.

Run the following command:

```sh
npx prisma db pull
```

You should see the following output:

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma
Datasource "db": CockroachDB database "prisma", schema "public" at "localhost:26257"

Introspecting based on datasource defined in prisma/schema.prisma …

✔ Introspected 3 models and wrote them into prisma/schema.prisma in 334ms

Run prisma generate to generate Prisma Client.
```

If you open the Prisma schema (`prisma/schema.prisma`) you should see 3 models.

## 6. Rename relation fields in the Prisma schema

Now that you have introspected your database, you will rename the relation fields in the Prisma schema so that its easier to access relations using the same field naming conventions.

> **Note:** [Prisma-level relation fields](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/use-custom-model-and-field-names#renaming-relation-fields) (sometimes referred to as "virtual relation fields") only exist in the Prisma schema, but do not actually manifest in the underlying database. You can therefore name these fields whatever you want.

Open the Prisma schema and apply the following changes:

```diff
model Comment {
  id        String   @id(map: "primary") @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  createdAt DateTime @default(now())
  comment   String
  authorId  String   @db.Uuid
  postId    String   @db.Uuid
-  Post      Post     @relation(fields: [postId], references: [id], map: "fk_postId_ref_Post")
+  post      Post     @relation(fields: [postId], references: [id], map: "fk_postId_ref_Post")
-  User      User     @relation(fields: [authorId], references: [id], map: "fk_writtenById_ref_User")
+  author    User     @relation(fields: [authorId], references: [id], map: "fk_writtenById_ref_User")
}

model Post {
  id        String    @id(map: "primary") @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  createdAt DateTime  @default(now())
  title     String
  content   String?
  published Boolean   @default(false)
  authorId  String    @db.Uuid
-  User      User      @relation(fields: [authorId], references: [id], map: "fk_authorId_ref_User")
+  author    User      @relation(fields: [authorId], references: [id], map: "fk_authorId_ref_User")
-  Comment   Comment[]
+  comments  Comment[]
}

model User {
  id        String    @id(map: "primary") @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
-  Comment   Comment[]
+  comments   Comment[]
-  Post      Post[]
+  posts      Post[]
}
```

## 7. Generate Prisma Client

Now that your Prisma schema has been introspected, you will generate Prisma Client.
Prisma Client will be generated from the Prisma schema so that you can access your database in a fully type-safe manner.

To generate Prisma Client run the following command:

```sh
npx prisma generate
```

You should see the following output:

```
Environment variables loaded from .env
Prisma schema loaded from prisma/schema.prisma

✔ Generated Prisma Client (3.9.0 | library) to ./node_modules/@prisma/client in 82ms
You can now start using Prisma Client in your code. Reference: https://pris.ly/d/client

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

```

## 8. Run the tests and script

To run the test in `tests/prisma.test.ts`, run the following command:

```
npm run test
```

To run the script `src/script.ts`, run the following command:

```
npm run start
```

As a next step, explore the `script.ts` file to see how to use Prisma Client to read and write data in the database.
