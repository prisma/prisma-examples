# Prisma Compute Next.js example

This is a Next.js App Router app that uses Prisma ORM with PostgreSQL and
deploys to Prisma Compute with `@prisma/cli`.

The app sets `output: "standalone"` in `next.config.ts`, which is the output
shape Prisma Compute expects for Next.js.

## Run locally

```bash
npm install
cp .env.example .env
# Edit .env and set DATABASE_URL to a reachable PostgreSQL database.

npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The JSON endpoint is
available at [http://localhost:3000/api/users](http://localhost:3000/api/users).

## Deploy to Prisma Compute

Authenticate once:

```bash
npm run compute:login
```

Create and link a Prisma project, then load your database URL into the shell
and add it to the production environment:

```bash
npm exec prisma-cli -- project create prisma-compute-nextjs

set -a
source .env
set +a

npm run compute:env:add
```

Deploy the app:

```bash
npm run compute:deploy
```

After a successful deploy, inspect the app with:

```bash
npm run compute:open
npm run compute:logs
```
