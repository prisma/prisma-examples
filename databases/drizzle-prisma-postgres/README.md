# Drizzle with Prisma Postgres

This example shows how to use [Drizzle ORM](https://orm.drizzle.team/) with [Prisma Postgres](https://www.prisma.io/postgres).

## Getting started

### 1. Download the example and install dependencies

Clone this repository and download this template:

```bash
npx try-prisma@latest --template databases/drizzle-prisma-postgres
```

Then navigate into the project directory and install dependencies:

```bash
cd drizzle-prisma-postgres
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

- create `users` and `posts` tables (if they do not exist)
- create a user with a post
- query all published posts and include each author
- update one post title

## Next steps

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- [Drizzle documentation](https://orm.drizzle.team/docs/overview)
- [Join the Prisma Discord](https://pris.ly/discord)
