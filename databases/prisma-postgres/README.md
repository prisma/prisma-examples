# Prisma Postgres, Queries, Real-time & Caching Example

This project contains a sample application demonstrating various capabilities and workflows of [Prisma Postgres](https://prisma.io/data-platform/postgres):

- Schema migrations and queries (via [Prisma ORM](https://www.prisma.io/orm))
- Connection pooling and caching (via [Prisma Accelerate](https://prisma.io/data-platform/acceelerate))
- Real-time database change events (via [Prisma Pulse](https://prisma.io/data-platform/pulse))

> **Note**: Prisma Postgres is currently in Early Access and not yet recommended for production usage. There are no automated backups and a risk of total data loss.

## Getting started

### 1. Set up a Prisma Postgres database in Prisma Data Platform

Follow these steps to create your Prisma Postgres database:

1. Log in to [Prisma Data Platform](https://console.prisma.io/).
1. In a [workspace](https://www.prisma.io/docs/platform/about#workspace) of your choice, click the **New project** button.
1. Add name for your project in the **Name** field, e.g. **hello-ppg**.
1. In the **Prisma Postgres** section, click the **Get started** button.
1. In the **Region** dropdown, select the region that's closest to your current location, e.g. **US East (N. Virginia)**.
1. Click the **Create project button**.

At this point, you'll be redirected to the **Dashboard** where you will need to wait a few seconds while the status of your database changes from **PROVISIONING**, to **ACTIVATING** to **CONNECTED**.

### 2. Download example and install dependencies

Copy the `try-prisma` command, paste it in your terminal and execute it.

For reference, this is what the command looks like (note that the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder must be replaced with _your_ actual database connection string):

```
npx try-prisma@latest
  --template databases/prisma-postgres
  --connection-string __YOUR_DATABASE_CONNECTION_STRING__
  --name hello-prisma-postgres
  --install npm
  --path .
```

Your connection string that should replace the `__YOUR_DATABASE_CONNECTION_STRING__` placeholder should look similar to this: `prisma+postgres://accelerate.prisma-data.net/?api_key=ey...`

Navigate into the project directory and install dependencies:

```
cd hello-prisma-postgres
npm install
```

### 3. Create database tables with a migration

Next,
