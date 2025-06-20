# Better-Auth + Prisma example

This example shows how to implement **authentication** using [Better-Auth](https://better-auth.com/), [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io).

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/betterauth-nextjs
```

Then, navigate into the project directory:

```
cd betterauth-nextjs
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/betterauth-nextjs
npm install
```

</details>

Rename the `.env.example` file to `.env`

#### [Optional] Switch database to Prisma Postgres

This example uses a local SQLite database by default. If you want to use to [Prisma Postgres](https://prisma.io/postgres), follow these instructions (otherwise, skip to the next step):

### 1. Set up Prisma

1. Set up a new Prisma Postgres instance in the Prisma Data Platform [Console](https://console.prisma.io) and copy the database connection URL.
2. Update the `datasource` block to use `postgresql` as the `provider` and paste the database connection URL as the value for `url`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

3. Add your database url to the `.env`

4. Install the Prisma Accelerate extension:
   ```
   npm install @prisma/extension-accelerate
   ```
5. Add the Accelerate extension to the `PrismaClient` instance in `src/lib/prisma.ts`:

   ```diff
   + import { withAccelerate } from "@prisma/extension-accelerate"

   + const prisma = new PrismaClient().$extends(withAccelerate())
   ```

That's it, your project is now configured to use Prisma Postgres!

### 2. Generate and migrate Prisma client

1. Run the following command to generate the Prisma Client. This is what you will be using to interact with your database.

```
npx prisma generate
```

2. Migrate the DB

```
npx prisma migrate dev --name init
```

### 3. Set up Better-Auth

1. Generate a Better-Auth secret

```
npx @better-auth/cli@latest secret
```

2. Add the secret to the `.env`.

3. If using Postgres, change the database provider in `auth.ts`

```diff
# change
  database: prismaAdapter(prisma, {
-    provider: 'sqlite',
  }),
# to
  database: prismaAdapter(prisma, {
+    provider: 'postgresql',
  }),
```

4. (Optional) If running on a port other than 3000, add that url to the `trustedOrigins` field in `auth-client.ts`

```diff
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true,
  },
+ trustedOrigins: ['http://localhost:3001'],
})
```

### 4. Start the development server

```
npm run dev
```

The server is now running at http://localhost:3000

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
