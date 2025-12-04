# REST API Example with Elysia & Prisma

This example shows how to implement a **simple Todo REST API with TypeScript** using [Elysia](https://elysiajs.com/) and [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client). It connects to a Postgres database via the [`@prisma/adapter-pg`](https://www.prisma.io/docs/orm/overview/databases/postgresql/pg-driver-adapter) driver adapter.

This example uses [Prismabox](https://github.com/m1212e/prismabox) to automatically generate Elysia validation models from the Prisma schema, ensuring type safety and eliminating the need to manually define validation schemas.

## Project structure

- `src/index.ts` – defines the Elysia server and the REST routes for todos.
- `src/lib/prisma.ts` – creates a Prisma Client using `@prisma/adapter-pg`.
- `prisma/schema.prisma` – Prisma schema with the `Todo` model.
- `prisma/seed.ts` – seeds the database with sample todos.

## Getting started

### 1. Download the example and install dependencies

```bash
npx try-prisma@latest --template orm/elysia --name elysia
cd elysia
bun install
```

> Alternatively clone this repo and run `bun install` inside `prisma-examples/orm/elysia`.

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

### 3. Generate Prisma Client & Prismabox models, migrate & seed the database

```bash
bunx prisma generate
bunx prisma migrate dev --name init
bunx prisma db seed
```

This generates:
- **Prisma Client** - for database operations
- **Prismabox models** - Elysia validation schemas (in `src/generated/prismabox/`)
- Creates the tables defined in [`prisma/schema.prisma`](./prisma/schema.prisma)
- Runs [`prisma/seed.ts`](./prisma/seed.ts) to insert demo data

### 4. Start the REST API server

```bash
bun run dev
```

The server listens on `http://localhost:3000`.

## API Endpoints

- `GET /todos` – get all todos
- `GET /todos/:id` – get a single todo by ID
- `POST /todos` – create a new todo
- `PUT /todos/:id` – update a todo
- `PATCH /todos/:id/toggle` – toggle todo completion status
- `DELETE /todos/:id` – delete a todo

## Example API requests

### Get all todos

```bash
curl http://localhost:3000/todos
```

### Create a todo

```bash
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries"}'
```

### Update a todo

```bash
curl -X PUT http://localhost:3000/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries and cook dinner", "completed": true}'
```

### Toggle todo completion

```bash
curl -X PATCH http://localhost:3000/todos/1/toggle
```

### Delete a todo

```bash
curl -X DELETE http://localhost:3000/todos/1
```

## Features

- **Type-safe API**: Elysia's built-in schema validation with `Elysia.t` ensures type safety at both runtime and compile time.
- **Prismabox Integration**: Automatically generates Elysia validation models from Prisma schema, eliminating manual schema definitions.
- **Prisma ORM**: Full type safety with Prisma Client and automatic type inference.
- **PostgreSQL**: Uses `@prisma/adapter-pg` for direct database connections.
- **Bun runtime**: Optimized for Bun's fast JavaScript runtime.

## Learn more

- [Elysia Documentation](https://elysiajs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prismabox Documentation](https://github.com/m1212e/prismabox)
- [Prisma Client API Reference](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
