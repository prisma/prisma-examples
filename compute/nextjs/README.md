# Prisma Compute Next.js example

This is a Next.js App Router app that uses Prisma ORM with PostgreSQL and
deploys to Prisma Compute with `@prisma/cli@next` (Prisma 8 release candidate).

The app sets `output: "standalone"` in `next.config.ts`, which is the output
shape Prisma Compute expects for Next.js.

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

Connect this repository to a Prisma Compute project. Every push to the
connected branch then builds and deploys automatically.

```bash
bun run compute:connect
```

After connecting, open the running service with:

```bash
bun run compute:open
```

Each push creates a build. To stream the full build log, copy the build ID
from the GitHub check run and run:

```bash
npx -y @prisma/cli@next build logs <build-id>
```
