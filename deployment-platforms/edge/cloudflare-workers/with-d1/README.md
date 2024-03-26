# Deploy a Cloudflare Worker with D1

This example demonstrates how to deploy a [Cloudflare Worker](https://workers.cloudflare.com/) with a [D1 database](https://developers.cloudflare.com/d1/). It's based on Cloudflare's [`hello-world`](https://github.com/cloudflare/workers-sdk/tree/4fdd8987772d914cf50725e9fa8cb91a82a6870d/packages/create-cloudflare/templates/hello-world) template for Workers.

Note that D1 is currently in public beta and not yet recommended for production workfloads.

## Getting started

### 1. Download example and install dependencies

Download this example:

```
tbd
```

Install npm dependencies:

```
cd with-d1
npm install
```

### 2. Create D1 database

Create your D1 database using the `wrangler` CLI:

```
npx wrangler d1 create prisma-demo-db
```

> **Note**: This command requires you to be logged into your Cloudflare account.

The command outputs the [binding](https://developers.cloudflare.com/workers/configuration/bindings/) configuration for your D1 database.

Take this output and paste it into `wrangler.toml` which then should look similar to this:

```diff
# wrangler.toml
name = "prisma-d1-example"
main = "src/index.ts"
compatibility_date = "2024-03-20"
compatibility_flags = ["nodejs_compat"]

# Add the binding for your D1 database here
+[[d1_databases]]
+binding = "DB" # i.e. available in your Worker on env.DB
+database_name = "prisma-demo-db"
+database_id = "__YOUR_D1_DATABASE_ID__"
```

Note that `__YOUR_D1_DATABASE_ID__` in the snippet above is a placeholder that should be replaced with the database ID of your own D1 instance. If you weren't able to grab this ID from the terminal output, you can also find it in the [Cloudflare Dashboard](https://dash.cloudflare.com/) or by running `npx wrangler d1 info prisma-demo-db` in your terminal.


### 3. Create a table in the database and seed some dummy data

Prisma Migrate doesn't support D1 yet, so you can't follow the "default" migration workflows using `prisma migrate dev` or `prisma db push`. For this example, the file [`./prisma/schema.sql`](./prisma/schema.sql) contains a SQL statement to create a `User` table that mirros the shape of the `User` model in [`./prisma/schema.prisma`](./prisma/schema.prisma).

To apply this SQL statement to your D1 instance, run the following command.

First, for the _local_ database to enable you to test your Worker with D1 locally:

```
npx wrangler d1 execute prisma-demo-db --file=prisma/schema.sql --local
```

> **Note**: Your local D1 instance is located in `.wrangler/state/v3/d1`

And one more time for the _remote_ database which is managed by Cloudflare in the cloud:

```
npx wrangler d1 execute prisma-demo-db --file=prisma/schema.sql --remote
```

Next, create some dummy data using the same `wrangler d1 execute` command again. This time, the SQL statement is hardcoded in the terminal command.

Start with the _local_ database:

```
npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Local)');" --local
```

And then execute the same command against the _remote_ database:

```
npx wrangler d1 execute prisma-demo-db --command "INSERT INTO  \"User\" (\"email\", \"name\") VALUES
('jane@prisma.io', 'Jane Doe (Remote)');" --remote
```

### 4. Run the Worker locally

Run the Worker locally using the following command:

```
npm run dev
```

You can now access the Worker on [`http://localhost:8787`](http://localhost:8787). It should render the following JSON data in the browser:

```json
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Local)"}]
```

### 5. Deploy the Worker

To deploy the Worker, run the following command:

```
npx wrangler deploy
```

You can now access the Worker on `https://prisma-d1-example.__USERNAME__.workers.dev`. It should render the following JSON data in the browser:

```json
[{"id":1,"email":"jane@prisma.io","name":"Jane Doe (Remote)"}]
```


## Notes about migrations

Since D1 currently doesn't support Prisma Migrate, you can't follow the "default" migration workflows using `prisma migrate dev` or `prisma db push`. Instead, you need to create the tables manually using the `wrangler d1 execute` command as shown above.

The tricky situation with Prisma ORM is that you need a Prisma schema file whose models map to your SQL tables. And, whenever a change is made to the schema in D1 using `wrangler d1 execute`, the Prisma schema needs to mirror that change and `prisma generate` needs to be executed to update the generated `@prisma/client` package in your `node_modules` directory and make it compatible with the new database schema.

While not ideal, you can use the `prisma migrate dev` and/or `prisma migrate diff` commands to generate SQL statements that you can send to D1 using `wrangler d1 execute`.
