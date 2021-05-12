# MongoDB example

This example shows how to use Prisma with MongoDB and use [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) in a **Node.js script** to read and write data in a MongoDB database. You can find the database schema in [`./prisma/schema.prisma`](./schema.sql).

The example consists of two parts:

- `tests/prisma.test.ts`: Jest test (in TypeScript) with a variety of Prisma Client queries and assertions to showcase access patterns
- `src/prisma-examples`: TypesScript files containing different Prisma Client queries

## Early Access warning

The Prisma MongoDB connector is currently available in [Early Access](https://www.prisma.io/docs/about/releases#early-access). This means that it **shouldn't be used in production**.

Currently, there are several limitations:

- No support for embedded documents. [Related issue](https://github.com/prisma/prisma/issues/6708)
- No data migrations functionality: this means that updating your Prisma schema when your database has data that was created with an earlier version of the Prisma schema will raise type error. [Related issue](https://github.com/prisma/prisma/issues/6715).
- No support for unique indexes. [Related issue](https://github.com/prisma/prisma/issues/6727)

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/databases/mongodb
npm install
```

### 2. Start MongoDB with Docker Compose

Run the following command from the `mongodb` folder to start MongoDB:

```
docker compose up -d
```

> **Note:** The `docker-compose.yml` is where the root username and password are set with the `MONGO_INITDB_ROOT_USERNAME` `MONGO_INITDB_ROOT_PASSWORD` env vars

### 3. Configure the database connection URL

Prisma uses the `DATABASE_URL` environment variable defined in the `.env` file (in the same folder as `package.json`) to connect to the database.

Create the file:

```bash
touch .env
```

Then add the following line:

```
DATABASE_URL="mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin&retryWrites=true&w=majority"
```

### 4. Generate Prisma Client

Generate Prisma Client using the following command:

```bash
npx prisma generate
```

### 5. Run the tests

To run the test in `tests/prisma.test.ts`, run the following command:

```bash
npm run test
```

### 6. Run the example scripts

To run the example scripts in `src/prisma-examples`, run the following commands:

```bash
npm run script:create-user
npm run script:find-user
npm run script:update-user
npm run script:delete-user
npm run script:create-user-post
npm run script:find-posts
```
