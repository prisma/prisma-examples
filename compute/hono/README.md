# Prisma Compute Hono example

This is a small Hono API that uses Prisma ORM with PostgreSQL and deploys to
Prisma Compute with the latest `@prisma/cli`.

## Run locally

```bash
bun install
cp .env.example .env

# Authenticate once, then create a Prisma Postgres database.
bun run compute:login
bun run compute:database:create

# Copy the printed DATABASE_URL into .env.

bun run db:generate
bun run db:migrate --name init
bun run db:seed
bun run dev
```

Open [http://localhost:8080](http://localhost:8080). The JSON endpoint is
available at [http://localhost:8080/api/users](http://localhost:8080/api/users).

## Deploy to Prisma Compute

Deploy the app. The script passes `.env` to Prisma Compute, so the deployed app
uses the same seeded database.

```bash
bun run compute:deploy
```

After a successful deploy, inspect the app with:

```bash
bun run compute:open
bun run compute:logs
```
