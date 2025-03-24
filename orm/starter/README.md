# Prisma Example: TypeScript Starter

This repository has been created to help you get started with [Prisma ORM](https://prisma.io). This project comes with a basic [`schema.prisma`](./prisma/schema.prisma) configured with PostgreSQL and an example operation found in the [`index.ts`](./index.ts) file.

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a PostgreSQL database (if you don't have one yet, you can use Prisma Postgres)

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/starter
```

Then, navigate into the project directory:

```
cd starter
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/starter
npm install
```

</details>

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

Run the [main script](./index.ts)

```bash
npm run start
```

This will add a new user to the `User` table, and then run a simple query to fetch all users.

## Resources

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
