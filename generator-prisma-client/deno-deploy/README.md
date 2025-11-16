# Prisma Postgres Example: Deno Deploy (Deno 2, ESM)

This project showcases how to use the Prisma ORM with Prisma Postgres in an ESM Deno Deploy application.

## Prerequisites

To successfully run the project, you will need the following:

- A **Prisma Postgres** connection string. You can create a project in your [Prisma Data Platform](https://pris.ly/pdp) account and enable Postgres to obtain one.

## Tech Stack

- Deno 2
- ESM
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./prisma/schema.prisma) for details.
  
  ```prisma
  generator client {
    provider = "prisma-client"
    output = "../src/generated/prisma"
    runtime = "deno"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/deno-deploy
deno install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variable with your Prisma Postgres connection string:

```bash
# .env

DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"
```

Replace `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` with your actual Prisma Postgres connection string.

### 3. Generate Prisma Client

Run:

```
deno task prisma generate
```

### 4. Run a migration to create the database structure and seed the database

The [Prisma schema file](./prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```
deno task prisma migrate dev --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./prisma/seed.ts) to create some sample records in the table:

```
deno task prisma db seed
```

### 5. Start the app

You can run the app with the following command:

```
deno task dev
```

### 6. Deploy to Deno Deploy

To deploy your application to Deno Deploy, follow these steps:

```
deno install -gArf jsr:@deno/deployctl
deployctl deploy --project=prisma-client-deno-deploy --env-file=.env
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
