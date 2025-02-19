# TypedSQL Example

This example shows how to use the TypedSQL feature of [Prisma ORM](https://www.prisma.io/docs/orm/overview/introduction/what-is-prisma) in a TypeScript project. TypedSQL allows you to write fully type-safe SQL queries and then run them via Prisma Client.

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/typedsql
```

Then, navigate into the project directory:

```
cd typedsql
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/typedsql
npm install
```

</details>

### 2. Create and seed the database

Create a new [Prisma Postgres](https://www.prisma.io/docs/postgres/overview) database by executing:

```terminal
npx prisma@latest init --db
```

If you don't have a [Prisma Data Platform](https://console.prisma.io/) account yet, or if you are not logged in, the command will prompt you to log in using one of the available authentication providers. A browser window will open so you can log in or create an account. Return to the CLI after you have completed this step.

Once logged in (or if you were already logged in), the CLI will prompt you to select a project name and a database region.

After successful creation, you will see output similar to the following:

<details>

<summary>CLI output</summary>

```terminal
Let's set up your Prisma Postgres database!
? Select your region: ap-northeast-1 - Asia Pacific (Tokyo)
? Enter a project name: testing-migration
✔ Success! Your Prisma Postgres database is ready ✅

We found an existing schema.prisma file in your current project directory.

--- Database URL ---

Connect Prisma ORM to your Prisma Postgres database with this URL:

prisma+postgres://accelerate.prisma-data.net/?api_key=...

--- Next steps ---

Go to https://pris.ly/ppg-init for detailed instructions.

1. Install and use the Prisma Accelerate extension
Prisma Postgres requires the Prisma Accelerate extension for querying. If you haven't already installed it, install it in your project:
npm install @prisma/extension-accelerate

...and add it to your Prisma Client instance:
import { withAccelerate } from "@prisma/extension-accelerate"

const prisma = new PrismaClient().$extends(withAccelerate())

2. Apply migrations
Run the following command to create and apply a migration:
npx prisma migrate dev

3. Manage your data
View and edit your data locally by running this command:
npx prisma studio

...or online in Console:
https://console.prisma.io/{workspaceId}/{projectId}/studio

4. Send queries from your app
If you already have an existing app with Prisma ORM, you can now run it and it will send queries against your newly created Prisma Postgres instance.

5. Learn more
For more info, visit the Prisma Postgres docs: https://pris.ly/ppg-docs
```

</details>

Locate and copy the database URL provided in the CLI output. Then, create a `.env` file in the project root and paste the URL into it. For example:

```bash
# .env file
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=...
```

Run the following command to create tables in your database. This creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```terminal
npx prisma migrate dev --name init
```

Execute the seed file in [`prisma/seed.ts`](./prisma/seed.ts) to populate your database with some sample data, by running:

```terminal
npx prisma db seed
```

### 3. Generate Prisma Client with SQL

```
npx prisma generate --sql
```

This command runs `prisma generate --sql`, which will generate the Prisma Client and also check any SQL files in the `prisma/sql` directory. After type-checking the SQL files, they are compiled into JavaScript and added to the Prisma Client.

> [!TIP]
> This also works with the `--watch` flag! If you want to automatically generate and watch for changes, you can use `npx prisma generate --sql --watch`.

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

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [Prisma Discord](https://pris.ly/discord)
