# Prisma Pulse Example: Starter

This repository has been created to help you get started with [Pulse](https://prisma.io/pulse). You will be able to use this project with any Pulse-ready PostgreSQL database. This project comes with a basic [`schema.prisma`](./prisma/schema.prisma) file as well as a Pulse stream found in the [`index.ts`](./index.ts) file.

## Prerequisites

To successfully run the project, you will need the following:

- The **connection string** of a Pulse-ready database (if you don't have one yet, you can configure your database following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup) or [use a Railway template](https://railway.app/template/pulse-pg?referralCode=VQ09uv))
- A **Pulse API key** which you can get by enabling Pulse in a project in your [Prisma Data Platform](https://pris.ly/pdp) account (learn more in the [docs](https://www.prisma.io/docs/platform/concepts/environments#api-keys))

## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/pulse/starter
npm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and update the `DATABASE_URL` and `PULSE_API_KEY` environment variables with the values of your connection string and your Pulse API key:

```bash
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
PULSE_API_KEY="__YOUR_PULSE_API_KEY__"
```

Note that `__YOUR_DATABASE_CONNECTION_STRING__` and `__YOUR_PULSE_API_KEY__` are placeholder values that you need to replace with the values of your connection string and your Pulse API key.

### 3. Run a database migration to create the `User` table

The Prisma schema file contains a single `User` model. You can map this model to the database and create the corresponding `User` table using the following command:

```bash
npx prisma migrate dev --name init
```

You now have an empty `User` table in your database.

### 4. Start the Pulse stream

Run the [script](./index.ts) that contains the code to stream database events:

```bash
npx ts-node index.ts
```

This will create a basic stream on the `User` table. Whenever a record is created, updated or deleted in that table, an event will fire and the script will execute a `console.log` statement with details of the event it received.

The code can be found in the [`index.ts`](./index.ts) file. To learn more about the Pulse API and how to use it, check out our [documentation](https://www.prisma.io/docs/data-platform/pulse/api-reference#stream).

<details><summary>Pulse stream on the `User` table</summary>

```ts
async function main() {
  const stream = await prisma.user.stream()

  for await (const event of stream) {
    console.log('just received an event:', event)
  }
}
```

</details>

### 5. Test the stream

The following instructions use [Prisma Studio](https://www.prisma.io/studio) to create a new record in the `User` table. However, you can use any other method to write to the `User` table (e.g. a SQL client like `psql` or [TablePlus](https://tableplus.com/)) in order to trigger a database change event in Pulse.

1. Start Prisma Studio in a new terminal: `npx prisma studio`
2. Add a new record to the `User` table via Prisma Studio UI.
3. Return to your terminal where you ran the `npx ts-node index.ts` command.
4. If everything is set up properly you will see an output that is similar to the following.

   ```
   just received an event: {
     "action": "create",
     "created": {
       "id": 1,
       "email": "test@prisma.io",
       "name": "test"
     }
   }
   ```

## Deployment

You can also deploy this project on Railway by following the instructions in our [docs](https://www.prisma.io/docs/pulse/database-setup/railway#setup-with-template-prisma-pulse-db--app).

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/pulse-starter?referralCode=VQ09uv)

## Resources

- [Pulse examples](https://pris.ly/pulse-examples)
- [Pulse documentation](https://pris.ly/pulse-docs)
- [Pulse announcement blog post](https://pris.ly/gh/pulse-ga)
- [Prisma Discord](https://pris.ly/discord)
