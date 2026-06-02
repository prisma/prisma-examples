# Prisma Compute TanStack Start example

This is a TanStack Start app that uses Prisma ORM with PostgreSQL and deploys to
Prisma Compute with `@prisma/cli`.

The app uses the Nitro Vite plugin so `vite build` emits the `.output/server`
shape supported by Prisma Compute.

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

Load your database URL into the shell, then deploy:

```bash
set -a
source .env
set +a
npm run compute:deploy
```

The deploy script runs:

```bash
prisma-cli app deploy --framework tanstack-start --env DATABASE_URL="$DATABASE_URL"
```

After a successful deploy, inspect the app with:

```bash
npm run compute:open
npm run compute:logs
```

