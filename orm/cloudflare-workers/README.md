# Cloudflare Workers Example

This example shows how to implement a simple API using [Cloudflare Workers](https://workers.cloudflare.com) and [Prisma ORM](https://www.prisma.io/docs). The example creates a serverless worker that interacts with a PostgreSQL database to create and count users.

## Getting started

### 1. Download the example and navigate to the project directory

Download this example:

```
npx try-prisma@latest --template orm/cloudflare-workers
```

Then navigate to the project directory

```
cd cloudflare-workers
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/cloudflare-workers
npm install
```

</details>

### 2. Create a Prisma Postgres instance

This example uses a [Prisma Postgres](https://prisma.io/postgres) database by default. To get started with the project, you will need to setup a Prisma Postgres connection string:

1. Set up a new Prisma Postgres instance in the [Prisma Data Platform Console](https://console.prisma.io) and copy the database connection URL.

2. Add your database url to the `.env`

That's it, your project is now configured to use Prisma Postgres!


### 3. Generate Prisma Client

Run the following command to generate the Prisma Client. This is what you will be using to interact with your database.

```
npm run generate
```

### 4. Start the Cloudflare Worker

```
npm run dev
```

The server is now running at http://localhost:8788

### 5. Test the API

The API supports full CRUD operations. Here are some example `curl` commands:

**Create a user:**
```bash
curl -X POST http://localhost:8788/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John Doe"}'
```

**Get all users:**
```bash
curl http://localhost:8788/users
```

**Get a specific user:**
```bash
curl http://localhost:8788/users/1
```

**Update a user:**
```bash
curl -X PUT http://localhost:8788/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'
```

**Delete a user:**
```bash
curl -X DELETE http://localhost:8788/users/1
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
