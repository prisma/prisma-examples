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