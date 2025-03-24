# Prisma Postgres Example: Queries, Connection Pooling & Caching

This project contains a sample application demonstrating various capabilities and workflows of [Prisma Postgres](https://prisma.io/data-platform/postgres):

- Schema migrations and queries (via [Prisma ORM](https://www.prisma.io/orm))
- Connection pooling and caching (via [Prisma Accelerate](https://prisma.io/data-platform/accelerate))

## Getting started

### 1. Set up a Prisma Postgres database in Prisma Data Platform

Follow these steps to create your Prisma Postgres database:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Type a name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project** button.

At this point, you'll be redirected to the **Database** page where you will need to wait a few seconds while the status of your database changes from **`PROVISIONING`**, to **`ACTIVATING`** to **`CONNECTED`**.

Once the green **`CONNECTED`** label appears, your database is ready to use!

Then, find your database credentials in the **Set up database access** section, copy the `DATABASE_URL` environment variable and store it securely.

```bash no-copy
DATABASE_URL=<your-database-url>
```

> These `DATABASE_URL` environment variable will be required in the next steps.

Once that setup process has finished, move to the next step.

### 2. Download example and install dependencies

Copy the `try-prisma` command that', paste it into your terminal, and execute it:

```terminal
npx try-prisma@latest \
  --template databases/prisma-postgres \
  --name hello-prisma \
  --install npm
```

<!-- For reference, this is what the command looks like (note that the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder must be replaced with _your_ actual database connection string):

```
npx try-prisma@latest
  --template databases/prisma-postgres
  --connection-string __YOUR_DATABASE_CONNECTION_STRING__
  --name hello-prisma
  --install npm
```

Your connection string that should replace the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder looks similar to this: `prisma+postgres://accelerate.prisma-data.net/?api_key=ey...`
-->

Navigate into the project directory and (if you haven't done so via the CLI wizard) install dependencies:

```terminal
cd hello-prisma
npm install
```

### 3. Set database connection

The connection to your database is configured via environment variables in a `.env` file.

First, rename the existing `.env.example` file to just `.env`:

```terminal
mv .env.example .env
```

Then, find your database credentials in the **Set up database access** section, copy the `DATABASE_URL` environment variable and paste them into the `.env` file.

For reference, the file should now look similar to this:

```bash
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
```

### 4. Create database tables (with a schema migration)

Next, you need to create the tables in your database. You can do this by creating and executing a schema migration with the following command of the Prisma CLI:

```terminal
npx prisma migrate dev --name init
```

This will map the `User` and `Post` models that are defined in your [Prisma schema](./prisma/schema.prisma) to your database. You can also review the SQL migration that was executed and created the tables in the newly created `prisma/migrations` directory.

### 5. Execute queries with Prisma ORM

The [`src/queries.ts`](./src/queries.ts) script contains a number of CRUD queries that will write and read data in your database. You can execute it by running the following command in your terminal:

```terminal
npm run queries
```

Once the script has completed, you can inspect the logs in your terminal or use Prisma Studio to explore what records have been created in the database:

```terminal
npx prisma studio
```

### 6. Explore caching with Prisma Accelerate

The [`src/caching.ts`](./src/caching.ts) script contains a sample query that uses [Stale-While-Revalidate](https://www.prisma.io/docs/accelerate/caching#stale-while-revalidate-swr) (SWR) and [Time-To-Live](https://www.prisma.io/docs/accelerate/caching#time-to-live-ttl) (TTL) to cache a database query using Prisma Accelerate. You can execute it as follows:

```terminal
npm run caching
```

Take note of the time that it took to execute the query, e.g.:

```terminal
The query took 2009.2467149999998ms.
```

Now, run the script again:

```terminal
npm run caching
```

You'll notice that the time the query took will be a lot shorter this time, e.g.:

```terminal
The query took 300.5655280000001ms.
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
