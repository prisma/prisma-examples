# TypedSQL Example

This example shows how to use the TypedSQL feature of [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) in a TypeScript project along with the [`prisma-client`](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client-preview) generator. TypedSQL allows you to write fully type-safe SQL queries and then run them via Prisma Client.

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template generator-prisma-client/basic-typedsql --install npm --name basic-typedsql
```

Then, navigate into the project directory:

```
cd basic-typedsql
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/generator-prisma-client/basic-typedsql
pnpm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
pnpm prisma migrate dev --name init
```

When `pnpm prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Generate Prisma Client with SQL

```
pnpm prisma generate --sql
```

This command runs `prisma generate --sql`, which will generate the Prisma Client and also check any SQL files in the `prisma/sql` directory. After type-checking the SQL files, they are compiled into JavaScript and added to the Prisma Client.

> [!TIP]
> This also works with the `--watch` flag! If you want to automatically generate and watch for changes, you can use `pnpm prisma generate --sql --watch`.

### 4. Run the example

```
npm run dev
```

This command will run [`index.ts`](./index.ts), which will execute the SQL query defined in [`prisma/sql/conversionByVariant.sql`](./prisma/sql/conversionByVariant.sql) and print the results to the console.

## Project Structure

This example project is structured similarly to the [starter example](https://github.com/prisma/prisma-examples/tree/latest/orm/starter) with a key difference:

- [`prisma/sql/`](./prisma/sql/): Contains SQL query files that are type-checked by Prisma and then included in the generated Prisma Client.
  - [`prisma/sql/conversionByVariant.sql`](./prisma/sql/conversionByVariant.sql): Example SQL query used in the project.

Key areas to look at:
1. Database schema: [`prisma/schema.prisma`](./prisma/schema.prisma)
2. Example SQL query: [`prisma/sql/conversionByVariant.sql`](./prisma/sql/conversionByVariant.sql)
3. Query execution: [`src/index.ts`](./src/index.ts)
4. Data seeding: [`prisma/seed.ts`](./prisma/seed.ts)
5. Build and run scripts: [`package.json`](./package.json)
6. Configure the Prisma CLI: [`prisma.config.ts`](./prisma.config.ts)

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
