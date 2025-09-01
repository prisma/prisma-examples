# Bun + Prisma ORM + Driver Adapters example

## Introduction

A simple web server using [Bun](https://bun.sh/) and [Prisma ORM](https://www.prisma.io/) with [Prisma Postgres](https://www.prisma.io/postgres). This example helps you build a Bun binary that starts a simple HTTP web server that returns all the users from the database.

This example uses:

- Bun's built-in HTTP server
- New [`prisma-client` generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client-preview) and the `bun` runtime
- [Driver Adapters (`node-postgres` driver)](https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-node-postgres-driver)

## Prerequisites

- **Bun**: Make sure you have Bun installed on your system. If not, install it from [bun.sh](https://bun.sh/)
- **Database**: Use a Prisma Postgres database or any other supported database by Prisma. This example uses [Prisma Postgres](https://www.prisma.io/postgres).

## Getting started

### 1. Set up environment variables

Copy the [`.env.example`](./.env.example) file to `.env`:

```bash
cp .env.example .env
```

Run the following command to receive a temporary Prisma Postgres database connection string:

```bash
npx create-db
```

You should have a similar output to the following:

```bash
┌  🚀 Creating a Prisma Postgres database
│
│  Provisioning a temporary database in us-east-1...
│
│  It will be automatically deleted in 24 hours, but you can claim it.
│
◇  Database created successfully!
│
│
●  Connect to your database →
│
│    Use this connection string optimized for Prisma ORM:
│
│    $DATABASE_URL
│
│
│    Use this connection string for everything else:
│
│    $DIRECT_URL
│
│
◆  Claim your database →
│
│    Want to keep your database? Claim for free via this link:
│
│    https://create-db.prisma.io?projectID=proj_cmf0tcods01d6z1ff9eyvqgd0&utm_source=create-db&utm_medium=cli
│
│     Your temporary database will be deleted in 24 hours if not claimed.
│
└
```

Get the database URL and paste it in your `.env` file:

```bash
DATABASE_URL="your_prisma_postgres_connection_string_here"
DIRECT_URL="your_direct_connection_string_here"
```

- The `DATABASE_URL` is the connection string optimized for Prisma ORM and helps you perform migrations.
- The `DIRECT_URL` is the connection string for everything else and in this case helps you [perform database queries](./db.ts) using driver adapters.

> Learn more about `npx create-db` [in our docs](https://www.prisma.io/docs/postgres/introduction/npx-create-db).

### 2. Install dependencies

```bash
bun install
```

### 3. Run migrations and seed the database

Create a new migration:

```bash
bun prisma migrate dev
```

Generate the Prisma client:

```bash
bun prisma generate
```

Seed the database:

```bash
bun prisma db seed
```

### 4. Start the server

```bash
bun run index.ts
```

Server runs on `http://localhost:3000` and whenever it is visited it returns all the users in the database.

### 5. Build and run a Bun executable

Build the executable:

```bash
bun build --compile index.ts
```

Run the executable:

```bash
./index
```

You should see `Listening on http://localhost:3000` in the console, and when you visit `http://localhost:3000` in your browser, you should see the list of users in the database.

## Project structure

```text
├── prisma/
│   └── schema.prisma         # Database schema and Prisma configuration
│   └── seed.ts               # Database seed file
├── generated/                # Generated Prisma Client (custom output location)
├── db.ts                     # Database connection with Prisma driver adapters
├── index.ts                  # Main server file
├── package.json              # Dependencies and scripts
├── prisma.config.ts           # Prisma configuration
└── .env.example              # Environment variables template
```
