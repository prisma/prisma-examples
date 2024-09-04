# TiDB example

This example shows how to:

- Connect Prisma to a TiDB database
- Create the database schema with raw SQL
- Populate the Prisma schema using [`prisma db pull`](https://www.prisma.io/docs/reference/api-reference/command-reference#db-pull)
- Read and write data to the database using [Prisma Client](https://www.prisma.io/client)

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/script.ts`: Node.js script with queries similar to the ones in the test.

## Prerequisites

- Node.js installed.
- [TiUP](https://docs.pingcap.com/tidb/dev/tiup-overview#install-tiup) installed. (Optional if you using TiDB Serverless)
- [Docker](https://www.docker.com/products/docker-desktop) installed. (Optional if you using TiDB Serverless)

> **Note:** You can also connect to a [free TiDB Serverless Cluster](https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud).

## 1. Download this example & install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/databases/tidb
```

Install npm dependencies:

```
cd tidb
npm install
```

<details>
<summary><strong>Alternative:</strong>Clone this repository</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/tidb
npm install
```

</details>

## 2. Start a TiDB database server

There are two approaches to setting up a TiDB database:

1. Using a free hosted [TiDB Serverless](https://tidbcloud.com/free-tail).
2. Using TiUP cli to start a local TiDB cluster.
3. Locally with Docker using the included [`docker-compose.yml`](./docker-compose.yml) file.

### (Option 1) Using TiDB Serverless (Recommended)

Follow the [guide](https://docs.pingcap.com/tidbcloud/dev-guide-build-cluster-in-cloud) to create a free TiDB Serverless cluster.

### (Option 2) Using TiDB Serverless

Execute the following command to start a local TiDB cluster:

```sh
tiup playground --without-monitor --tiflash 0
```

### (Option 3) Start TiDB with Docker

Run the following command from the `tidb` folder to start a TiDB Docker container:

```sh
docker compose up -d
```

## 3. Configure the database connection URL

Prisma uses the `DATABASE_URL` environment variable in `.env` in the `tidb` folder to connect to the database.

Create the file by copying the example file:

```sh
cp .env.example .env
```

Modify the `DATABASE_URL` in `.env` to point to your database server:


- If you're using a local TiDB cluster deployed by TiUP or Docker Compose, you can use the following connection string by default:

  ```sh
  DATABASE_URL="mysql://root@localhost:4000/test"
  ```

- If you're using a TiDB Serverless cluster, you can find the database connection information in the console and fill in the following connection string:

  **Note: You MUST to add `?sslaccept=strict` to the end of the connection string to connect to TiDB Serverless.**

  ```sh
  DATABASE_URL="mysql://<username>:<password>@<host>:4000/test?sslaccept=strict"
  ```

## 4. Create the database schema in TiDB with Prisma Migrate

Now that you have defined the `DATABASE_URL` in `.env`, you will use Prisma Migrate to create a migration file with the SQL necessary to create the database schema.

Run the following command from the `tidb` folder:

```
npx prisma migrate dev --name init
```

You should see the following output:

```
Your database is now in sync with your schema.
```

> **Note:** The `prisma migrate dev` command will automatically generate Prisma Client for use in `script.ts`.

## 5. Run the tests and script

To run the test in `tests/prisma.test.ts`, run the following command:

```
npm run test
```

To run the script `src/script.ts`, run the following command:

```
npm run start
```

As a next step, explore the `script.ts` file to see how to use Prisma Client to read and write data in the database.
