# Prisma Compute Hono example

This is a small Hono API that uses Prisma ORM with PostgreSQL and deploys to
Prisma Compute with the latest `@prisma/cli`.

## Run locally

```bash
npm install
cp .env.example .env

# Authenticate once, then create a Prisma Postgres database.
npm run compute:login
npm run compute:database:create

# Copy the printed DATABASE_URL into .env.

npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Open [http://localhost:8080](http://localhost:8080). The JSON endpoint is
available at [http://localhost:8080/api/users](http://localhost:8080/api/users).

## Deploy to Prisma Compute

Deploy the app. The script passes `.env` to Prisma Compute, so the deployed app
uses the same seeded database.

```bash
npm run compute:deploy
```

After a successful deploy, inspect the app with:

```bash
npm run compute:open
npm run compute:logs
```
