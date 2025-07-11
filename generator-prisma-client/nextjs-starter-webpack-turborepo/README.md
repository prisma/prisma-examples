# Prisma Postgres Example: Next.js 15 Starter (Turborepo, Webpack, Node.js, ESM)

This project showcases how to use the Prisma ORM with Prisma Postgres in an ESM monorepo, containing a Next.js application and Prisma package definition, and powered by Turborepo.

It also demonstrates that [@prisma/nextjs-monorepo-workaround-plugin](https://www.npmjs.com/package/@prisma/nextjs-monorepo-workaround-plugin) is no longer needed, as the `prisma-client` generator supports ESM and monorepos out of the box.

## Project Structure

```
.
├── apps                                   # Web application packages
│   └── next-app                           # Next.js application
│       ├── app
│       ├── components
│       ├── lib
│       │   ├── db.ts                      # Prisma Client instance
│       │   ├── ...
│       ├── next.config.mjs
│       ├── package.json
│       └── tsconfig.json
├── package.json                           # Root package.json for the monorepo
├── packages                               # Internal libraries
│   ├── config-typescript
│   └── database
│       ├── package.json
│       ├── prisma
│       │   └── schema.prisma              # Prisma schema file 
│       ├── src
│       │   ├── enums.ts
│       │   ├── index.ts
│       │   └── seed.ts
│       └── tsconfig.json
├── pnpm-workspace.yaml                    # Pnpm workspace configuration file
└── turbo.json                             # Turborepo configuration file
```

## Prerequisites

To successfully run the project, you will need the following:

- Two **Prisma Postgres** connection strings:
  - Your **Prisma Postgres + Accelerate connection string** (containing your **Prisma API key**) which you can get by enabling Postgres in a project in your [Prisma Data Platform](https://pris.ly/pdp) account. You will use this connection string to run Prisma migrations.
  - Your **Prisma Postgres direct TCP connection string** which you will use with Prisma Client.
    Learn more in the [docs](https://www.prisma.io/docs/postgres/database/direct-connections).
- [`pnpm`](https://pnpm.io/) installed globally to manage the monorepo workspace.

## Tech Stack

- Turborepo 2
- Next.js 15
  - Runtime: Node.js 20.19.0
  - Bundler: Webpack 5
- ESM
  - `package.json` contains `{ "type": "module" }`
  - `next.config.js` -> `next.config.mjs`
  - `postcss.config.js` -> `postcss.config.mjs`
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./packages/prisma/prisma/schema.prisma) for details.
  
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
cd prisma-examples/generator-prisma-client/nextjs-starter-webpack-turborepo
pnpm install
```

### 2. Configure environment variables

Create a `.envrc` in the root of the project directory:

```bash
touch .envrc
```

Now, open the `.envrc` file and set the `DATABASE_URL` environment variables with the values of your connection string and your Prisma Postgres connection string:

```bash
# .envrc

# Prisma Postgres connection string (used for migrations)
export DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

# Postgres connection string (used for queries by Prisma Client)
export DIRECT_URL="__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Note that `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres + Accelerate connection string. Notice that the Accelerate connection string has the following structure: `prisma+postgres://accelerate.prisma-data.net/?api_key=<api_key_value>`.

Note that `__YOUR_PRISMA_POSTGRES_DIRECT_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your Prisma Postgres direct TCP connection string. The direct connection string has the following structure: `postgres://<username>:<password>@<host>:<port>/<database>`.

Expose the environment variables to your project by running the following command:

```bash
source .envrc
```

### 3. Run a migration to create the database structure and seed the database

The [Prisma schema file](./packages/prisma/prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```sh
pnpm db:migrate:dev -- --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./packages/prisma/prisma/seed.ts) to create some sample records in the table:

```sh
pnpm db:seed
```

### 4. Build the Prisma Client and the Next.js app

Run:

```
pnpm build
```

### 7. Start the Next.js app

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
