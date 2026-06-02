# Prisma Compute Hono example

This is a small Hono API that uses Prisma ORM with PostgreSQL and deploys to
Prisma Compute with `@prisma/cli`.

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

Open [http://localhost:8080](http://localhost:8080). The JSON endpoint is
available at [http://localhost:8080/api/users](http://localhost:8080/api/users).

## Deploy to Prisma Compute

Authenticate once:

```bash
npm run compute:login
```

Load your database URL into the shell, then deploy:

```bash
set -a
source .env
set +a
npm run compute:deploy
```

The deploy script runs:

```bash
prisma-cli app deploy --framework hono --http-port 8080 --env DATABASE_URL="$DATABASE_URL"
```

After a successful deploy, inspect the app with:

```bash
npm run compute:open
npm run compute:logs
```

