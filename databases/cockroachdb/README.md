# CockroachDB example

This example shows how to:

- Connect Prisma to a CockroachDB database
- Create the database schema with raw SQL
- Populate the Prisma schema using [`prisma db pull`](https://www.prisma.io/docs/reference/api-reference/command-reference#db-pull)
- Read and write data to the database using [Prisma Client](https://www.prisma.io/client)

> **Note:** CockroachDB support in Prisma is currently in [**Preview**](https://www.prisma.io/docs/about/prisma/releases#preview), and **Prisma Migrate isn't supported for now**. For this reason, you will create the database schema with raw SQL.

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/script.ts`: Node.js script with queries similar to the ones in the test.

## Prerequisites

- Node.js installed.
- [Docker](https://www.docker.com/products/docker-desktop) installed

> **Note:** You can also connect to a [free CockroachDB Serverless Cluster](https://www.cockroachlabs.com/docs/cockroachcloud/create-a-serverless-cluster.html).

## 1. Download example & install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/databases/cockroachdb
```

Install npm dependencies:

```
cd cockroachdb
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
cd prisma-examples/databases/cockroachdb
npm install
```

</details>

## 2. Start a CockroachDB database server

There are two approaches to setting up a CockroachDB database:

1. Locally with Docker using the included [`docker-compose.yml`](./docker-compose.yml) file.
1. Using a free hosted [CockroachDB Serverless](https://www.cockroachlabs.com/get-started-cockroachdb-v2/).

### (Option 1) Start CockroachDB with Docker

Run the following command from the `cockroachdb` folder to start a CockroachDB Docker container:

```sh
docker compose up -d
```

### (Option 2) Using CockroachDB Serverless

Follow the following [guide](https://www.cockroachlabs.com/docs/cockroachcloud/create-a-serverless-cluster.html) to create a free CockroachDB Serverless cluster.

<!-- ### Start a locally installed CockroachDB

Run the following command from the `cockroachdb` folder to start a local CockroachDB node:

```sh
cockroach start-single-node --insecure --advertise-host localhost
```

You should see the following output once the CockroachDB started:

```
CockroachDB node starting at 2022-01-25 09:45:28.105611 +0000 UTC (took 1.7s)
build:               CCL v21.2.4 @ 2022/01/10 18:53:16 (go1.16.6)
webui:               http://localhost:8080
sql:                 postgresql://root@localhost:26257/defaultdb?sslmode=disable
sql (JDBC):          jdbc:postgresql://localhost:26257/defaultdb?sslmode=disable&user=root
RPC client flags:    cockroach <client cmd> --host=localhost:26257 --insecure
logs:                /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/logs
temp dir:            /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/cockroach-temp960221969
external I/O path:   /Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data/extern
store[0]:            path=/Users/daniel/workspace/prisma-examples/databases/cockroachdb/cockroach-data
storage engine:      pebble
status:              restarted pre-existing node
clusterID:           dfa695a0-22e5-4356-8132-449169688432
nodeID:              1
``` -->

## 3. Configure the database connection URL

Prisma uses the `DATABASE_URL` environment variable in `.env` in the `cockroachdb` folder to connect to the database.

Create the file:

```sh
touch .env
```

Then add the following line:

```
DATABASE_URL="postgresql://root@localhost:26257/prisma?sslmode=disable"
```

> **Note:** If you're using CockroachDB Serverless, see [`.env.example`](./.env.example) for more information on how `DATABASE_URL` should look like with the cluster configruation.

## 4. Create the database schema in CockroachDB with Prisma Migrate

Now that you have defined the `DATABASE_URL` in `.env`, you will use Prisma Migrate to create a migration file with the SQL necessary to create the database schema.

Run the following command from the `cockroachdb` folder:

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
