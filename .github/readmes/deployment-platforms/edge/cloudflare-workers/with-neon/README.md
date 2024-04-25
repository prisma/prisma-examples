# Deploy a Cloudflare Worker with Neon Database

This example demonstrates how to deploy a [Cloudflare Worker](https://workers.cloudflare.com/) with [Neon Database](https://neon.tech/).

## Getting started

### 1. Download example and install dependencies

Download this example:

```
tbd
```

Install npm dependencies:

```
cd with-neon
npm install
```

### 2. Set the database connection locally

When running locally, Cloudflare Workers read their environment variables from a file called `.dev.vars`. Create this file:

```
touch .dev.vars
```

Next, add your database connection URL as an environment variable in that file:

```
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
```

It might look like this:

```
DATABASE_URL="postgresql://janedoe:mypassword42@ep-nameless-pond-a23b1mdz.eu-central-1.aws.neon.tech/neondb?sslmode=require"
```

> **Note**: If you don't have a database connection URL yet, you can create a new database in the Neon dashboard.

### 3. Migrate and seed the database

Run the following command to create the `User` table in your database:

```
npm run env -- npx prisma migrate dev --name init
```

> **Note**: The `.dev.vars` file used by Cloudflare Workers is incompatible with `.env` files that are used by Prisma ORM. That's why the `prisma` command is prefixed with the custom [env](./package.json#L9) script to load the environment variables and make them available to the Prisma CLI. Learn more in the [docs](https://www.prisma.io/orm/prisma-client/deployment/edge/deploy-to-cloudflare#setting-your-database-connection-url-as-an-environment-variable).

### 4. Run the worker locally

You can now run the Worker locally using the following command:

```
npm run dev
```

You can now access the Worker on [`http://localhost:8787`](http://localhost:8787).

### 5. Set the `DATABASE_URL` environment variable and deploy the Worker

To deploy the Worker, you first need to the `DATABASE_URL` environment variable via the `wrangler` CLI:

```
npx wrangler secret put DATABASE_URL
```

The command is interactive and will ask you to enter the value for the `DATABASE_URL` env var as the next step in the terminal.

> **Note**: This command requires you to be authenticated, and will ask you to log in to your Cloudflare account in case you are not.

Then you can go ahead then deploy the worker:

```
npx wrangler deploy
```
