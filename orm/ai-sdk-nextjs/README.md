# Vercel AI SDK V5 + Prisma example

This example shows how to store AI chat messages using [Vercel's AI SDK V5](https://ai-sdk.dev/docs/introduction), [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io).

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```bash
npx try-prisma@latest --template orm/ai-sdk-nextjs
```

Then, navigate into the project directory:

```bash
cd ai-sdk-nextjs
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```bash
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```bash
cd prisma-examples/orm/ai-sdk-nextjs
npm install
```

</details>

Rename the `.env.example` file to `.env`

### 2. Create a Prisma Postgres instance

This example uses a [Prisma Postgres](https://prisma.io/postgres) database by default. To get started with the project, you will need to set up a Prisma Postgres connection string:

1. Set up a new Prisma Postgres instance in the [Prisma Data Platform Console](https://console.prisma.io) and copy the database connection URL.

> You can also start a new Prisma Postgres using [create-db](https://create-db.prisma.io).
>
> Run `npx create-db@latest` and copy the DATABASE_URL that is _"optimized for Prisma ORM"_.

2. Add your database URL to the `.env`

That's it, your project is now configured to use Prisma Postgres!

### 3. Generate and migrate Prisma client

1. Run the following command to generate the Prisma Client. This is what you will be using to interact with your database.

```bash
npx prisma generate
```

2. Migrate the DB

```bash
npx prisma migrate dev --name init
```

### 4. Set up OpenAI

1. Navigate to [OpenAI API keys](https://platform.openai.com/api-keys)

2. Create a new API key and give it full access

3. Add the API key to the `.env`.

### 5. Start the development server

```bash
npm run dev
```

The server is now running at [http://localhost:3000](http://localhost:3000)

## Switch to another database

If you want to try this example with another database rather than Prisma Postgres, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in our documentation.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
