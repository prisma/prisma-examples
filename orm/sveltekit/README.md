# SvelteKit Example

This example shows how to implement a simple web app using [SvelteKit](https://svelte.dev/docs/kit) and [Prisma ORM](https://www.prisma.io/docs).

## Getting started

### 1. Download the example and navigate to the project directory

Download this example:

```
npx try-prisma@latest --template orm/sveltekit  --install npm --name sveltekit
```

Then navigate to the project directory

```
cd sveltekit
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/sveltekit
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

```terminal
npx prisma init --db
```

Generate the Prisma types:

```terminal
npx prisma generate
```

### 4. Start the SvelteKit server

```
npm run dev
```

The server is now running at http://localhost:5173

## Switch to another database

If you want to try this example with another database rather than Prisma Postgres, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in our documentation.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
