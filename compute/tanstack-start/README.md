# Prisma Compute TanStack Start example

This is a TanStack Start app that uses Prisma ORM with PostgreSQL and deploys to
Prisma Compute with the latest `@prisma/cli`.

The app uses the Nitro Vite plugin so `vite build` emits the `.output/server`
shape supported by Prisma Compute.

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

Open [http://localhost:3000](http://localhost:3000). The JSON endpoint is
available at [http://localhost:3000/api/users](http://localhost:3000/api/users).

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
