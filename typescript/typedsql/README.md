# TypedSQL Example

This example shows how to use the TypedSQL feature of [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) in a TypeScript project. TypedSQL allows you to write fully type-safe SQL queries and then run them via Prisma Client.

## Getting started

### 1. Download example and install dependencies

Download this example:

```
npx try-prisma@latest --template typescript/typedsql
```

Install npm dependencies:

```
cd typedsql
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/typedsql
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Generate Prisma Client with SQL

```
npm run generate
```

This command runs `prisma generate --sql`, which will generate the Prisma Client and also check any SQL files in the `prisma/sql` directory. After type-checking the SQL files, they are compiled into JavaScript and added to the Prisma Client.

### 4. Run the example

```
npm run dev
```

This command will run [`index.ts`](./index.ts), which will execute the SQL query defined in [`prisma/sql/conversionByVariant.sql`](./prisma/sql/conversionByVariant.sql) and print the results to the console.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [Prisma Discord](https://pris.ly/discord)
