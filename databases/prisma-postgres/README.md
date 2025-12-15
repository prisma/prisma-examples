# Prisma Postgres

This example shows how to use [Prisma ORM](https://www.prisma.io/orm) with [Prisma Postgres](https://prisma.io/postgres).

## Getting Started

### 1. Download the example & install dependencies

Clone this repository and install dependencies:

```bash
npx try-prisma@latest --template databases/prisma-postgres
```

Then navigate into the project directory and install dependencies:

```bash
cd prisma-postgres
bun install
```

### 2. Create a Prisma Postgres database

Run the following command to create a Prisma Postgres database:

```bash
npx create-db@latest
```

Copy the `DATABASE_URL` from the output and add it to a `.env` file:

```bash
DATABASE_URL="postgresql://..."
```

> **Tip:** Claim your database at the provided URL to keep it permanently.

### 3. Push the schema & generate Prisma Client

Push the schema to the database and generate Prisma Client:

```bash
npx prisma db push
npx prisma generate
```

### 4. Run the example

```bash
bun run dev
```

## Next steps

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- [Prisma ORM documentation](https://www.prisma.io/docs/orm)
- [Join the Prisma Discord](https://pris.ly/discord)
