# Elysia + Prisma with Bun

Example of using [Elysia](https://elysiajs.com) with [Prisma ORM](https://www.prisma.io) on the Bun runtime.

## Stack

- **Framework**: Elysia
- **ORM**: Prisma
- **Runtime**: Bun
- **Database**: PostgreSQL
- **Validation**: Prismabox

## Quick Start

### Prerequisites

- Bun installed
- PostgreSQL database running

### Setup

1. Download the example and install dependencies:
```bash
bunx --bun try-prisma@latest --template orm/elysia --name hono
cd hono
```

2. Install dependencies:
```bash
bun install
```

3. Create `.env.local` from the example:
```bash
cp .env.example .env.local
```

4. Configure database connection in `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

5. Generate Prisma client:
```bash
bunx --bun prisma generate
```

6. Run migrations:
```bash
bunx --bun prisma migrate dev
```

### Development

Start the development server:
```bash
bun run dev
```

Server runs at `http://localhost:3000`

## Project Structure

```
prisma/
├── schema.prisma          # Database schema
├── generated/             # Generated files (not committed)
│   ├── client/           # Prisma client
│   └── prismabox/        # Type validators
└── migrations/           # Database migrations (not committed)

src/
└── index.ts              # Application entry point
```

## Database Schema

The example includes two models:

- **User**: `id`, `email`, `name`, `posts`
- **Post**: `id`, `title`, `content`, `published`, `author`, `authorId`

View and edit the schema in `prisma/schema.prisma`

## API

### Create User
```bash
curl -X PUT http://localhost:3000 \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"John"}'
```

### Get User by ID
```bash
curl http://localhost:3000/id/1
```

## Regenerating Prisma Client

After modifying `prisma/schema.prisma`:

```bash
bunx prisma generate
```

## Learn More

- [Elysia + Prisma Documentation](https://elysiajs.com/integrations/prisma.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Prisma Adapter for PostgreSQL](https://www.prisma.io/docs/orm/overview/databases/postgresql)
- [Prismabox Documentation](https://github.com/m1212e/prismabox)
