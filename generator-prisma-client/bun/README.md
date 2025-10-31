# Bun + Prisma ORM example

## Introduction

A simple web server using [Bun](https://bun.sh/) and [Prisma ORM](https://www.prisma.io/) with [Prisma Postgres](https://www.prisma.io/postgres). Creates a new user on each request and returns the total user count.

This example uses:

- Bun's built-in HTTP server
- New [`prisma-client` generator](https://www.prisma.io/docs/orm/prisma-schema/overview/generators#prisma-client-preview) and the `bun` runtime

## Prerequisites

- **Bun**: Make sure you have Bun installed on your system. If not, install it from [bun.sh](https://bun.sh/)
- **Database**: Use a Prisma Postgres database or [any other supported database by Prisma](https://www.prisma.io/docs/orm/reference/supported-databases) of your choosing. This example uses [Prisma Postgres](https://www.prisma.io/postgres).

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

Get the database URL and paste it in your `.env` file:

```bash
DATABASE_URL="your_postgresql_connection_string_here"
```

> Learn more about `npx create-db` [in our docs](https://www.prisma.io/docs/postgres/introduction/npx-create-db).

### 2. Install dependencies

```bash
bun install
```

### 3. Run database migrations

```bash
bun --bun prisma migrate dev
```

### 4. Start the server

```bash
bun run index.ts
```

Server runs on `http://localhost:3000`. Each request creates a new user and returns the total count.

## Project structure

```text
├── prisma/
│   └── schema.prisma          # Database schema and Prisma configuration
├── generated/                 # Generated Prisma Client (custom output location)
├── db.ts                     # Database connection with Prisma Postgres
├── index.ts                  # Main server file
├── package.json              # Dependencies and scripts
└── .env.example              # Environment variables template
```

## Features

- **New `prisma-client` generator**: Uses custom output path (`./generated/prisma`)
- **Bun runtime optimization**: Configured for Bun runtime in Prisma schema
- **Simple HTTP server**: Built using Bun's native HTTP server
