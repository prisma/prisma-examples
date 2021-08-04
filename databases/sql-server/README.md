# Microsoft SQL Server example

This example shows how to connect Prisma to an SQL Server database, create the database schema with [Prisma Migrate](https://www.prisma.io/migrate) and use [Prisma Client](https://www.prisma.io/client) in a **Node.js script** to read and write data in an SQL Server database. 

You can find the Prisma schema in [`./prisma/schema.prisma`](./prisma/schema.prisma) from which the SQL for the database schema is generated.

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/script.js`: Node.js script with queries similar to the ones in the test.

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/sql-server
npm install
```

### 2. Start SQL Server with Docker Compose

Run the following command from the `sql-server` folder to start SQL Server:

```
docker-compose up -d
```

> **Note:** The `docker-compose.yml` is where the super admin password is set with the `SA_PASSWORD` environment variable

### 3. Configure the database connection URL

Prisma will use the `DATABASE_URL` environment variable in `prisma/.env` to connect to the database.


Create the file:

```
touch prisma/.env
```

Then add the following line:

```
DATABASE_URL=sqlserver://localhost:1433;database=prisma-demo;user=SA;password=Pr1sm4_Pr1sm4;trustServerCertificate=true;encrypt=true
```

> **Note:** `DATABASE_URL` uses the `SA` (super admin) user of the database and the same password as defined in `docker-compose.yml`. In production it's recommend to create a dedicated user with only the necessary permissions.

### 4. Create the database schema in SQL Server with Prisma Migrate

Now that you have defined the `DATABASE_URL` in `prisma/.env`, you will use Prisma Migrate to create a migration file with the SQL necessary to create the database schema.

Run the following command from the `sql-server` folder:

```
npx prisma migrate dev --name "init"
```

You should see the following output:
```
Your database is now in sync with your schema.
```

> **Note:** The `prisma migrate dev` command will automatically generate Prisma Client for use in `script.js`.

### 5. Run the tests and script

To run the test in `tests/prisma.test.ts`, run the following command:

```
npm run test
```

To run the script `src/script.js`, run the following command:

```
npm run start
```


As a next step, explore the `script.js` file to see how to use Prisma Client to read and write data in the database.