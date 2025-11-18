# REST API Example with Hono & Prisma

This example shows how to implement a **REST API with TypeScript** using [Hono](https://hono.dev/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It connects to a Postgres database via the [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql/pg-driver-adapter) driver adapter and a normal `postgresql://` connection string (no Accelerate/Data Proxy required).

## Project structure

- `src/index.ts` – defines the Hono server and the REST routes (`/signup`, `/post`, `/feed`, …).
- `src/lib/prisma.ts` – lightweight middleware that creates a Prisma Client using `@prisma/adapter-pg` and exposes it via Hono’s context.
- `prisma/schema.prisma` – Prisma schema with the `User` and `Post` models that back the API.
- `prisma/seed.ts` – seeds the database with sample users and posts.

## Getting started

### 1. Download the example and install dependencies

```bash
npx try-prisma@latest --template orm/hono --name hono
cd hono
bun install
```

> Alternatively clone this repo and run `bun install` inside `prisma-examples/orm/hono`.

### 2. Configure `DATABASE_URL`

Create a Postgres database (Prisma Postgres, Supabase, Railway, Docker, etc.) and copy the direct connection string:

```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

Create a `.env` file in the project root and add the URL:

```bash
touch .env

# .env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require"
```

### 3. Migrate & seed the database

```bash
bunx prisma migrate dev --name init
bunx prisma db seed
```

This creates the tables defined in [`prisma/schema.prisma`](./prisma/schema.prisma) and runs [`prisma/seed.ts`](./prisma/seed.ts) to insert demo data.

### 4. Start the REST API server

```bash
bun run dev
```

The server listens on `http://localhost:3000`. Example requests:

- `POST /signup` – create a user (and optional posts).
- `POST /post` – create a post for an existing user.
- `PUT /publish/:id` – toggle the `published` flag.
- `GET /users` – list all users with their posts.
- `GET /feed?searchString=hello&take=5` – filter/paginate published posts.

Each route pulls the Prisma Client from the Hono context via `withPrisma`, so a single client instance is reused per request.

## Switch to another database

If you want to try this example with another database, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in the Prisma docs.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues or ask questions on [GitHub](https://github.com/prisma/prisma/)
