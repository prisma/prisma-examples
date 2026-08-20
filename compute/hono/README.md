# Prisma Compute Hono example

This is a small Hono API that uses Prisma 8 with PostgreSQL. Prisma Composer
provisions its database and service, applies its schema, and deploys it to
Prisma Compute.

## Run locally

```bash
bun install
cp .env.example .env

# Authenticate once, then create a Prisma Postgres database.
bun run compute:login
bun run compute:database:create

# Copy the printed DATABASE_URL into .env.

bun run contract:emit
bun run db:init
bun run db:seed
bun run dev
```

Open [http://localhost:8080](http://localhost:8080). The JSON endpoint is
available at [http://localhost:8080/api/users](http://localhost:8080/api/users).

## Deploy to Prisma Compute

Connect this repository to Prisma Cloud, then push the branch. The included
GitHub Actions workflow runs Composer, which provisions Prisma Postgres,
applies the Prisma 8 contract, and deploys the Hono service.

```bash
bun run compute:connect
```

When you change `src/prisma/contract.prisma`, emit the updated contract and
author a migration before pushing:

```bash
bun run contract:emit
bun run migration:plan --name describe-the-change
bun run db:update
```

After connecting, open the running service with:

```bash
bun run compute:open
```

Each push creates a build. To stream the full build log, copy the build ID
from the GitHub check run and run:

```bash
bunx prisma build logs <build-id>
```
