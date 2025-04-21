# Clerk + Prisma example

This example shows how to implement **authentication** using [Clerk](https://clerk.com/), [Next.js](https://nextjs.org/) and [Prisma](https://www.prisma.io).

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/clerk-nextjs
```

Then, navigate into the project directory:

```
cd clerk-nextjs
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/clerk-nextjs
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
5. Add the Accelerate extension to the `PrismaClient` instance:

   ```diff
   + import { withAccelerate } from "@prisma/extension-accelerate"

   + const prisma = new PrismaClient().$extends(withAccelerate())
   ```

That's it, your project is now configured to use Prisma Postgres!

### 2. Set up Clerk

#### 2.1. Create a new Clerk app

Create a new app at [dashboard.clerk.com/apps/new](https://dashboard.clerk.com/apps/new). Provide a name and select whichever sign-in options you would like.

Skip to Step 2 and copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and the `CLERK_SECRET_KEY`. Paste those into their respective positions in `.env`

#### 2.2. Expose your server via [ngrok](https://ngrok.com)

Install ngrok and expose it your local app:

```
npm install --global ngrok
ngrok http 3000
```

Copy the ngrok `Forwarding URL`. This will be used to set the webhook URL in Clerk.

Navigate to the **_Webhooks_** section of your Clerk application located near the bottom of the **_Configure_** tab under **_Developers_**.

Click **_Add Endpoint_** and paste the ngrok URL into the **_Endpoint URL_** field and add `/api/webhooks/clerk` to the end of the URL. It should look similar to this:

```
https://a60b-99-42-62-240.ngrok-free.app/api/webhooks/clerk
```

Copy the **_Signing Secret_** and add it to your `.env` file:

### 3. Start the development server

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
