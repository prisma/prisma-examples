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

To successfully run the project, you will need a **Prisma Postgres** connection string from your [Prisma Data Platform](https://pris.ly/pdp) project.
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
  See the [Prisma schema file](./packages/database/prisma/schema.prisma) for details.
  
  ```prisma
  generator client {
    provider   = "prisma-client"
    output     = "../src/generated/prisma"
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

Create an `.env` file in the `packages/database` directory:

```bash
cd packages/database; touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variable with your connection string:

```bash
# packages/database/.env

DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Then, create an `.env` file in the `apps/web` directory:

```bash
cd apps/web; touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variable with your connection string:

```bash
# apps/web/.env

DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Replace `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` with your actual Prisma Postgres connection string.

### 3. Build the Prisma Client and the Next.js app

Run:

```
pnpm build
```

### 4. Run a migration to create the database structure and seed the database

The [Prisma schema file](./packages/database/prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```sh
pnpm db:migrate:dev -- --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./packages/database/src/seed.ts) to create some sample records in the table:

```sh
pnpm db:seed
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
