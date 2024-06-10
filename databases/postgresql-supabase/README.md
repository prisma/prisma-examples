# PostgreSQL example using Supabase

This example shows you how to connect to a PostgreSQL database on [Supabase](https://supabase.com/) using Prisma, and use [Prisma Client](https://www.prisma.io/client) in a TypeScript script to read and write data.

## How to use

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/databases/postgresql-supabase
```

Install npm dependencies:
```
cd postgresql-supabase
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/postgresql-supabase
npm install
```
</details>

### 2. Set up Supabase


Create a `.env` file at the root of your folder. Copy and update the following environment variables in the `.env` file:


```sh
touch .env
```

#### Using a local development environment

If you have the Supabase CLI locally installed and have logged in, run the following command to start up Supabase

```sh
npx supabase start
```

```sh
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"
```

#### Using a managed environment

If you're using the hosted version, create another database that will serve as the [shadow database](https://www.prisma.io/docs/concepts/components/prisma-migrate/shadow-database#cloud-hosted-shadow-databases-must-be-created-manually).

```
postgres=> CREATE DATABASE postgres_shadow;
postgres=> exit
```

Next, update, your `.env` file with your `DATABASE_URL` and `SHADOW_DATABASE_URL` variables accordingly. Be sure to update the password (`[YOUR-PASSWORD]`) and project reference (`[YOUR-PROJECT-REF]`):

```
# .env
DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
SHADOW_DATABASE_URL="postgres://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres_shadow"
```

### Create the database schema

Run the following command to create a migration file with the SQL necessary to create the database schema:

```
npx prisma migrate dev --name init
```

You should see the following output:

```
Your database is now in sync with your schema.
```

### 3. Run the script

For the script to work, you first need to execute the [seed](./prisma/seed.ts) script to seed your database. You can do that using the following command:

```
npx prisma db seed
```

Then run the script [`script.ts`](./script.ts), using the following command:

```bash
npm run dev
```

As a next step, explore the `script.ts` file to see how to use Prisma Client to read and write data in the database.
