# Microsoft SQL Server example

This example shows how to use Prisma to introspect an SQL Server database and use [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) in a **Node.js script** to read and write data in an SQL Server database. You can find the database schema in [`./schema.sql`](./schema.sql).

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/script.js`: Node.js script with queries similar to the ones in the test.

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/sql-server
npm install
```

### 2. Start SQL Server with Docker Compose

Run the following command from the `sql-server` folder to start SQL Server:

```
docker-compose up -d
```

> **Note:** The `docker-compose.yml` is where the super admin password is set with the `SA_PASSWORD` environment variable

### 3. Create the database in SQL Server with `schema.sql`

The `schema.sql` file contains the SQL queries to create the database schema (which includes the database and tables).

Run `schema.sql` with the following [SQL Server `sqlcmd` CLI](https://docs.microsoft.com/en-us/sql/tools/sqlcmd-utility?view=sql-server-ver15) command:

```
sqlcmd -S 127.0.0.1 -U SA -P Pr1sm4_Pr1sm4 -i schema.sql
```

Alternatively, you can use one of the following tools to create the database schema:

- [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/what-is?view=sql-server-ver15)
- [TablePlus](https://tableplus.com/)
- [DBeaver](https://dbeaver.io)

### 4. Configure the database connection URL

Prisma will use the `DATABASE_URL` environment variable in `prisma/.env` to connect to the database.
Create the file:

```
touch prisma/.env
```

Then add the following line:

```
DATABASE_URL=sqlserver://localhost:1433;database=prisma-demo;user=SA;password=Pr1sm4_Pr1sm4;trustServerCertificate=true;encrypt=true
```

> **Note:** If you are running on macOS, you must use `encrypt=DANGER_PLAINTEXT` to work around the [current TLS limitation](https://github.com/prisma/prisma/issues/4075).

`DATABASE_URL` uses the `SA` (super admin) user of the database and the same password as defined in `docker-compose.yml`.

### 5. Introspect your database

The Prisma schema is the foundation for the generated Prisma Client API. Therefore, you first need to make sure that all the database tables are represented in it. The easiest way to do so is by introspecting your database:

```
npx prisma introspect
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run Prisma 2 CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma`. When using Yarn, you can run: `yarn prisma dev`.

The `introspect` command updates your `schema.prisma` file:

```prisma
model Comment {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  comment   String
  authorId  Int
  postId    Int
  User      User     @relation(fields: [authorId], references: [id])
  Post      Post     @relation(fields: [postId], references: [id])
}

model Post {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  title     String
  content   String?
  published Boolean   @default(false)
  authorId  Int
  User      User      @relation(fields: [authorId], references: [id])
  Comment   Comment[]
  Tag       Tag[]     @relation("TagToPost")
}

model Tag {
  id   Int    @id @default(autoincrement())
  tag  String @unique
  Post Post[] @relation("TagToPost")
}

model User {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
  Comment   Comment[]
  Post      Post[]
}
```

### 6. Rename the relation fields for easy access

Because both the generated `Post` and `Comment` fields in the `User` model are virtual (i.e. they're not backed by a foreign key in the database), you can manually rename them in your Prisma schema. This will only affect the generated client and is typically done so that they have a more meaningful name in the context of the relation.

Update the schema with the following changes which rename the relation fields:

```prisma
model Comment {
  id          Int      @id @default(autoincrement())
  createdAt   DateTime @default(now())
  comment     String
  writtenById Int
  postId      Int
  writtenBy   User     @relation(fields: [writtenById], references: [id])
  post        Post     @relation(fields: [postId], references: [id])
}

model Post {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  title     String
  content   String?
  published Boolean   @default(false)
  authorId  Int
  author    User      @relation(fields: [authorId], references: [id])
  comments  Comment[]
  tags      Tag[]     @relation("TagToPost")
}

model Tag {
  id    Int    @id @default(autoincrement())
  tag   String @unique
  posts Post[] @relation("TagToPost")
}

model User {
  id        Int       @id @default(autoincrement())
  createdAt DateTime  @default(now())
  email     String    @unique
  name      String?
  comments  Comment[]
  posts     Post[]
}
```

> **Note:** You can find the introspected schema with the relation fields renamed in `prisma/schema-introspected-renamed.prisma`.

### 7. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

### 8. Run the tests and script

To run the test in `tests/prisma.test.ts`, run the following command:

```
npm run test
```

To run the script `src/script.js`, run the following command:

```
npm run start
```
