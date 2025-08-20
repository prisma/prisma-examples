# Prisma Postgres Example: Next.js 15 Starter (Webpack, Node.js, ESM)

This project showcases how to use the Prisma ORM with Prisma Postgres in an ESM Next.js application.

## Prerequisites

To successfully run the project, you will need the following:

- Two **Prisma Postgres** connection strings:
  - Your **Prisma Postgres + Accelerate connection string** (containing your **Prisma API key**) which you can get by enabling Postgres in a project in your [Prisma Data Platform](https://pris.ly/pdp) account. You will use this connection string to run Prisma migrations.
  - Your **Prisma Postgres direct TCP connection string** which you will use with Prisma Client.
    Learn more in the [docs](https://www.prisma.io/docs/postgres/database/direct-connections).

## Tech Stack

- Next.js 15
  - Runtime: Node.js 20.19.0
  - Bundler: Webpack 5
- ESM
  - `package.json` contains `{ "type": "module" }`
  - `next.config.js` -> `next.config.mjs`
  - `postcss.config.js` -> `postcss.config.mjs`
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./prisma/schema.prisma) for details.
  
  ```prisma
  generator client {
    provider = "prisma-client"
    output = "../lib/generated/prisma"
    previewFeatures = ["driverAdapters", "queryCompiler"]
    runtime = "nodejs"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/nextjs-starter-webpack
pnpm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variables with the values of your connection string and your Prisma Postgres connection string:

```bash
# .env

# Prisma Postgres connection string (used for migrations)
DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

# Postgres connection string (used for queries by Prisma Client)
DIRECT_URL="__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Note that `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres + Accelerate connection string. Notice that the Accelerate connection string has the following structure: `prisma+postgres://accelerate.prisma-data.net/?api_key=<api_key_value>`.

Note that `__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres direct TCP connection string. The direct connection string has the following structure: `postgres://<username>:<password>@<host>:<port>/<database>`.

### 3. Generate Prisma Client

Run:

```
pnpm prisma generate
```

### 4. Run a migration to create the database structure and seed the database

The [Prisma schema file](./prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```
pnpm prisma migrate dev --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./prisma/seed.ts) to create some sample records in the table:

```
pnpm prisma db seed
```

### 5. Start the app

You can run the app with the following command:

```
pnpm dev
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
