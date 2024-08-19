# Prisma Example: TypeScript Starter

This repository has been created to help you get started with [Prisma ORM](https://prisma.io). This project comes with a basic [`schema.prisma`](./prisma/schema.prisma) configured with PostgreSQL, and an example operation found in the [`index.ts`](./index.ts) file.

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a PostgreSQL database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))

## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/typescript/starter
npm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and update the `DATABASE_URL` environment variables with the values of your connection string:

```bash
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
```

Note that `__YOUR_DATABASE_CONNECTION_STRING__` is a placeholder value that you need to replace with the values of your connection string.

### 3. Run a database migration to create the `User` table

The Prisma schema file contains a single `User` model. You can map this model to the database and create the corresponding `User` table using the following command:

```bash
npx prisma migrate dev --name init
```

You now have an empty `User` table in your database.

### 4. Run a Prisma operation

Run the [script](./index.ts) that contains the code:

```bash
npx ts-node index.ts
```

This will add a new user to the `User` table, and then run a simple query to fetch all users.

## Resources

- [Prisma Discord](https://pris.ly/discord)
