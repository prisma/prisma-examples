# TypeORM with Prisma Postgres

This example shows how to use [TypeORM](https://typeorm.io/) with [Prisma Postgres](https://www.prisma.io/postgres).

## Getting started

### 1. Download the example and install dependencies

Clone this repository and download this template:

```bash
npx try-prisma@latest --template databases/typeorm-prisma-postgres
```

Then navigate into the project directory and install dependencies:

```bash
cd typeorm-prisma-postgres
npm install
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

### 3. Run the example

```bash
npm run dev
```

The script will:

- create a user with a post
- query all published posts and include each author
- update one post title

`TypeORM` is configured with `synchronize: true` in `src/index.ts`, so tables are created automatically from the entities when the script runs.

## Next steps

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- [TypeORM documentation](https://typeorm.io/)
- [Join the Prisma Discord](https://pris.ly/discord)
