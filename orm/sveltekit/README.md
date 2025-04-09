# SvelteKit Example

This example shows how to implement a simple web app using [SvelteKit](https://svelte.dev/docs/kit) and [Prisma ORM](https://www.prisma.io/docs).

## Getting started

### 1. Download the example and navigate to the project directory

Download this example:

```
npx try-prisma@latest --template orm/sveltekit
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

#### [Optional] Switch database to Prisma Postgres

This example uses a local SQLite database by default. If you want to use to [Prisma Postgres](https://prisma.io/postgres), follow these instructions (otherwise, skip to the next step):

1. Set up a new Prisma Postgres instance in the Prisma Data Platform [Console](https://console.prisma.io) and copy the database connection URL.
2. Update the `datasource` block to use `postgresql` as the `provider` and paste the database connection URL as the value for `url`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = "prisma+postgres://accelerate.prisma-data.net/?api_key=ey...."
   }
   ```

   > **Note**: In production environments, we recommend that you set your connection URL via an [environment variable](https://www.prisma.io/docs/orm/more/development-environment/environment-variables/managing-env-files-and-setting-variables), e.g. using a `.env` file.

3. Install the Prisma Accelerate extension:
   ```
   npm install @prisma/extension-accelerate
   ```
4. Add the Accelerate extension to the `PrismaClient` instance:

   ```diff
   + import { withAccelerate } from "@prisma/extension-accelerate"

   + const prisma = new PrismaClient().$extends(withAccelerate())
   ```

That's it, your project is now configured to use Prisma Postgres!

### 2. Generate Prisma Client

Run the following command to generate the Prisma Client. This is what you will be using to interact with your database.

```
npx prisma generate
```

### 3. Start the SvelteKit server

```
npm run dev
```

The server is now running at http://localhost:5173

## Switch to another database

If you want to try this example with another database than SQLite, refer to the [Databases](https://www.prisma.io/docs/orm/overview/databases) section in our documentation

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
