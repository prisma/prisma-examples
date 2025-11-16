# Prisma Postgres Example: Next.js 15 Starter (Monorepo, Webpack, Node.js, ESM)

This project showcases how to use the Prisma ORM with Prisma Postgres in an ESM monorepo, containing a Next.js application and Prisma package definition.

It also demonstrates that [@prisma/nextjs-monorepo-workaround-plugin](https://www.npmjs.com/package/@prisma/nextjs-monorepo-workaround-plugin) is no longer needed, as the `prisma-client` generator supports ESM and monorepos out of the box.

## Project Structure

```
.
├── packages
│   ├── next-app                     # Next.js application
│   │   ├── app
│   │   ├── components
│   │   ├── lib
│   │   ├── next.config.mjs
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   └── tsconfig.json
│   └── prisma                       # Prisma Client definition and re-export
│       ├── package.json
│       ├── prisma
│       │   └── schema.prisma        # Prisma schema file 
│       ├── src
│       │   ├── enums.ts
│       │   └── index.ts
│       └── tsconfig.json
├── pnpm-workspace.yaml               # Pnpm workspace configuration file
└── tsconfig.json
```

## Prerequisites

To successfully run the project, you will need a **Prisma Postgres** connection string from your [Prisma Data Platform](https://pris.ly/pdp) project.
- [`pnpm`](https://pnpm.io/) installed globally to manage the monorepo workspace.

## Tech Stack

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
    provider   = "prisma-client"
    output     = "../src/generated/prisma"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/nextjs-starter-webpack-monorepo
pnpm install
```

### 2. Configure environment variables

Create a `.envrc` in the root of the project directory:

```bash
touch .envrc
```

Now, open the `.envrc` file and set the `DATABASE_URL` environment variable with your connection string:

```bash
# .envrc

export DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"

NEXT_PUBLIC_URL="http://localhost:3000"
```

Replace `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` with your actual Prisma Postgres connection string.

Expose the environment variables to your project by running the following command:

```bash
source .envrc
```

### 3. Generate Prisma Client

Run:

```
pnpm --filter @nextjs-starter-webpack-monorepo/prisma exec prisma generate
```

### 4. Run a migration to create the database structure and seed the database

The [Prisma schema file](./packages/prisma/prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```sh
pnpm --filter @nextjs-starter-webpack-monorepo/prisma exec prisma migrate dev --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./packages/prisma/prisma/seed.ts) to create some sample records in the table:

```sh
pnpm --filter @nextjs-starter-webpack-monorepo/prisma exec prisma db seed
```

### 5. Build the Prisma package

Run:

```sh
pnpm --filter @nextjs-starter-webpack-monorepo/prisma build
```

### 6. Install the workspace dependencies in the Next.js app

Run:

```sh
pnpm --filter @nextjs-starter-webpack-monorepo/next-app install
```

### 7. Start the Next.js app

You can run the app with the following command:

```
pnpm --filter @nextjs-starter-webpack-monorepo/next-app dev
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
