# Prisma Postgres Example: AWS Lambda + SST + Node.js + ESM

This project showcases how to use the Prisma ORM with AWS Lambda and Prisma Postgres in an TypeScript ESM application.

## Prerequisites

To successfully run the project, you will need the following:

- A **Prisma Postgres** connection string which you can get by enabling Postgres in a project in your [Prisma Data Platform](https://pris.ly/pdp) account. This connection string will be used for both Prisma migrations and Prisma Client queries.

## Tech Stack

- SST 3 + AWS Lambda
  - Runtime: Nodejs 20.x
  - Bundler: esbuild (used via SST)
  - `package.json` contains `{ "type": "module" }`
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./prisma/schema.prisma) for details.
  
  ```prisma
  generator client {
    provider = "prisma-client"
    output = "../src/generated/prisma"
  }

  datasource db {
    provider  = "postgresql"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/aws-lambda-sst-esbuild
pnpm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```bash
touch .env
```

Now, open the `.env` file and set the `DATABASE_URL` environment variable with your Prisma Postgres connection string:

```bash
# .env

# Prisma Postgres connection string
DATABASE_URL="__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__"
```

Note that `__YOUR_PRISMA_POSTGRES_CONNECTION_STRING__` is a placeholder value that you need to replace with your Prisma Postgres connection string. You can get this by enabling Postgres in a project in your [Prisma Data Platform](https://pris.ly/pdp) account.

### 3. Run a migration to create the database structure and seed the database

The [Prisma schema file](./prisma/schema.prisma) contains a single `Quotes` model and a `QuoteKind` enum. You can map this model to the database and create the corresponding `Quotes` table using the following command:

```
pnpm prisma migrate dev --name init
```

You now have an empty `Quotes` table in your database. Next, run the [seed script](./prisma/seed.ts) to create some sample records in the table:

```
pnpm prisma db seed
```

### 4. Generate Prisma Client

Run:

```
pnpm prisma generate
```

### 5. Run with SST

- Ensure you set up your AWS Credentials and have the AWS CLI installed and logged in (see [sst docs](https://sst.dev/docs/aws-accounts))
- Set up secrets in your SST project. You can do this by:
  - Manually adding the `DATABASE_URL` connection string that you previously set in your `.env` file, via:
  ```
  pnpm sst secret set DATABASE_URL __YOUR_PRISMA_POSTGRES_CONNECTION_STRING__
  ```
  - Or, by loading the `.env` file first and piping it to the `sst secret set` command:
  ```
  pnpm dotenv -- bash -c 'pnpm sst secret set DATABASE_URL "${DATABASE_URL}"'
  ```
- Run the following command to deploy the project to AWS Lambda using sst:

  ```
  pnpm sst deploy
  ```

You should see an output similar to this:

```sh
❯ pnpm sst deploy
SST 3.17.10  ready!

➜  App:        prisma-client-aws-lambda-sst
   Stage:      prisma

~  Deploy

|  Created     aws-lambda sst:aws:Function → aws-lambdaCode aws:s3:BucketObjectv2 (2.3s)
|  Created     aws-lambda sst:aws:Function → aws-lambdaSourcemap0 aws:s3:BucketObjectv2 (6.1s)
|  Updated     aws-lambda sst:aws:Function → aws-lambdaFunction aws:lambda:Function (12.7s)
|  Deleted     aws-lambda sst:aws:Function → aws-lambdaCode aws:s3:BucketObjectv2

↗  Permalink   https://sst.dev/u/<...>

✓  Complete    
   prisma-client-aws-lambda-sst: https://<...>.lambda-url.us-east-1.on.aws/
```

### 6. (Optional) Verify deployment size

You can check the size of your deployment package by running:

```
pnpm build
du -sh ./dist/index.js
```

and then

```
pnpm zip
du -sh ./dist/lambda.zip
```

The output should look similar to:

```
❯ du -sh ./dist/index.js
3.0M    ./dist/index.js

❯ du -sh ./dist/lambda.zip
1.1M    ./dist/lambda.zip
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
