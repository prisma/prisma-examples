# Better-Auth + Prisma example

This example shows how to implement **authentication** using [Better-Auth](https://better-auth.com/), [Astro](https://astro.build/) and [Prisma](https://www.prisma.io).

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/betterauth-astro
```

Then, navigate into the project directory:

```
cd betterauth-astro
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/betterauth-astro
npm install
```

</details>

Rename the `.env.example` file to `.env`

### 2. Create a Prisma Postgres instance

This example uses a [Prisma Postgres](https://prisma.io/postgres) database by default. To get started with the project, you will need to setup a Prisma Postgres connection string:

1. Set up a new Prisma Postgres instance in the [Prisma Data Platform Console](https://console.prisma.io) and copy the database connection URL.

2. Add your database url to the `.env`

That's it, your project is now configured to use Prisma Postgres!

### 3. Generate and migrate Prisma client

1. Run the following command to generate the Prisma Client. This is what you will be using to interact with your database.

```
npx prisma generate
```

2. Migrate the DB

```
npx prisma migrate dev --name init
```

### 4. Set up Better-Auth

1. Generate a Better-Auth secret

```
npx @better-auth/cli@latest secret
```

2. Add the secret to the `.env`.

3. (Optional) If running on a port other than 4321, add that url to the `trustedOrigins` field in `auth-client.ts`

```diff
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
+ trustedOrigins: ['http://localhost:4322'],
})
```

### 5. Start the development server

```
npm run dev
```

The server is now running at http://localhost:4321

## Switch to another database

If you want to try this example with another database rather than Prisma Postgres, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in our documentation.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
