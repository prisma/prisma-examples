# Simple TypeScript Script Example

This example shows how to use [Prisma Client JS](https://photonjs.prisma.io/) in a **simple TypeScript script** to read and write data in a SQLite database. You can find the database file with some dummy data at [`./db/dev.db`](./db/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install npm dependencies:

```
cd prisma-examples/introspection-only/typescript/sqlite/script
npm install
```

### 2. Introspect the database to get a Prisma schema

When using Prisma with an existing database, the first step is to introspect your database so that you get your Prisma schema. The Prisma schema is needed to generate Prisma's database client: Prisma Client JS.

Run the following command:

```
cd db
npx prisma2 introspect --url sqlite:./dev.db
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

This will introspect the SQLite database file and create a new file called `schema.prisma` (the order of the fields has been changed for readability):

```prisma
datasource db {
  provider = "sqlite"
  url      = "sqlite:./dev.db"
}

model Post {
  id        Int     @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?
}

model User {
  id    Int     @id
  email String  @unique
  name  String?
  posts Post[]
}
```

<Details><Summary>Expand to view the initial SQL schema</Summary>

The above Prisma schema represents the following SQL schema:

```sql
CREATE TABLE "Post" ( 
	"author" TEXT REFERENCES "User"(id) ON DELETE SET NULL, 
	"content" TEXT , 
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	"published" BOOLEAN NOT NULL DEFAULT false , 
	"title" TEXT NOT NULL
);

CREATE TABLE "User" ( 
	"email" TEXT NOT NULL UNIQUE, 
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	"name" TEXT
);
```

</Details>

### 3. Generate Prisma Client JS

To generate Prisma's type-safe database client, navigate back into the project's root directory and run the following command:

```
cd ..
npx prisma2 generate
```

This generates Prisma Client JS into `node_modules/@prisma/client`.

### 4. Run the script

Execute the script with this command: 

```
npm run dev
```


## Next steps

### Use Lift to persist the schema migration

The migrations that were generated throughout the development mode are _development migrations_ that are thrown away once the desired schema has been found. In that case, you need to persist the schema using the `lift` subcommands.

To persist your schema migration with Lift, run:

```
npx prisma2 lift save --name 'init'
npx prisma2 lift up
```

The first command, `lift save`, stores a number of migration files on the file sytem with details about the migration (such as the required migration steps and SQL operations), this doesn't yet affect the database. It also deletes the old development migrations. The second command, `lift up`, actually performs the schema migration against the database.

### Generate Photon.js with the CLI

Sometimes, e.g. in CI/CD environments, it can be helpful to generate Photon.js with a CLI command. This can be done with the `prisma2 generate command`. If you want to run it in this project, you need to prepend `npx` again:

```
npx prisma2 generate
```

### More things to explore

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Photon.js API](https://github.com/prisma/prisma2/blob/master/docs/photon/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track the Prisma Framework's progress on [`isprisma2ready.com`](https://isprisma2ready.com)