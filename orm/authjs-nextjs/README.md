# Auth.js + Prisma example

This example shows how to implement **authentication** using [Auth.js](https://authjs.dev/), [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io).

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/authjs-nextjs
```

Then, navigate into the project directory and install the dependencies:

```
cd authjs-nextjs
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/authjs-nextjs
npm install
```

</details>

Rename `.env.example` to `.env`

### 2. Create a Prisma Postgres instance

This example uses a [Prisma Postgres](https://prisma.io/postgres) database by default. To get started with the project, you will need to setup a Prisma Postgres connection string:

#### Option 1. Use the Prisma Data Platform Console

1. Set up a new Prisma Postgres instance in the [Prisma Data Platform Console](https://console.prisma.io) and copy the database connection URL.

2. Add your database url to the `.env`

#### Option 2. Use `npx create-db`

1. Run `npx create-db@latest` in your terminal.

2. Copy the string labeled **"Use this connection string optimized for Prisma ORM"** and add it to the `.env` under `DATABASE_URL`

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

### 4. Set up Auth.js

1. Generate a Auth.js secret.

```
npx auth secret --copy
```

2. Add the secret to the `.env`.

### 5. Set up Github OAuth

There are many options for OAuth providers (See list here). For this example we've gone with Github.

1. Navigate to [Github's Developer Settings](https://github.com/settings/developers) and hit **New OAuth app**

2. Fill out the required details

- Application name: "Auth.js + Prisma Example"
- Homepage URL: "http://localhost:3000/"
- Authorization callback URL: "http://localhost:3000/api/auth/callback/github"

4. Hit **Register application**, then **Generate a new client secret** to create a new Client Secret

5. Copy and paste the Client ID and Client Secret in `.env` next to their respective variables

### 6. Start the development server

> **Warning**
> 
> Before starting the development server, note that if you are using Next.js v15.2.0 or v15.2.1, do not use Turbopack as there is a known [issue](https://github.com/vercel/next.js/issues/76497). Remove Turbopack from your dev script by updating your `package.json`
> 
> ```json
> {
>   "scripts": {
>     - "dev": "next dev --turbopack"
>     + "dev": "next dev"
>   }
> }
> ```
> 
> This change is not needed on any versions before or after.

```
npm run dev
```

The server is now running at http://localhost:3000

## Switch to another database

If you want to try this example with another database rather than Prisma Postgres, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in our documentation.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
