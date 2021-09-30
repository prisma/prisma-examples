# PlanetScale Prisma example

This example shows how to connect Prisma to a PlanetScale database, create the database schema with [Prisma Migrate](https://www.prisma.io/migrate) and use [Prisma Client](https://www.prisma.io/client) in a **TypeScript Node.js script** to read and write data to the database.

You can find the Prisma schema in [`./prisma/schema.prisma`](./prisma/schema.prisma) from which the SQL for the database schema is generated.

## Referential Actions and Referential Integrity

Referential Integrity is a technique to ensure the consistency between related data in your database and is typically implemented in by the database. For example, in a database with with a 1:n relation between users and blog posts, referential integrity is enforced by the database using foreign key constraints will ensure that that every post related to a user points to a valid user ID.

Referential Integrity is closely related to Referential Actions – the mechanism to allow you to control how changes to one model impact related models. For example, you can use Referential Actions to ensure that when a user is deleted, all related posts pointing to that user are deleted too using the `Cascade` option. Alternatively, you can set it to `SetNull`` to that deleting a user will set the foreign key in the Post model to null.

While referential integrity is typically enforced by the database, some databases like PlanetScale do not support this. In such situations, Prisma can take on the responsibility of ensuring referential integrity on a best-effort basis. In practice this means that Prisma will handle referential actions instead of the database.

Referential Integrity is in Preview as of version [3.1.1](https://github.com/prisma/prisma/releases/tag/3.1.1) and it is set to `prisma` in the [Prisma schema](./prisma/schema.prisma).


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

### 2. Create a database on PlanetScale

Run the following command using the [PlanetScale CLI](https://planetscale.com/cli) to create a database:

```
pscale database create prisma-planetscale
```

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
