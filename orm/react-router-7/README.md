# React Router 7 Example

This example shows how to implement a simple web app using [React Router 7](https://reactrouter.com) and [Prisma ORM](https://www.prisma.io/docs). This example was bootstrapped using the React Router CLI tool `create-react-router`.

## Getting started

### 1. Download the example and navigate to the project directory

Download this example:

```
npx try-prisma@latest --template orm/react-router-7
```

Then navigate to the project directory

```
cd react-router-7
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/nextjs
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

### 3. Start the React Router 7 server

```
npm run dev
```

The server is now running at http://localhost:5173. You can now view your todo list!

## Switch to another database (e.g. PostgreSQL, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than SQLite, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block.

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### PostgreSQL

For PostgreSQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
}
```

Here is an example connection string with a local PostgreSQL database:

```prisma
datasource db {
  provider = "postgresql"
  url      = "postgresql://janedoe:mypassword@localhost:5432/notesapi?schema=public"
}
```

### MySQL

For MySQL, the connection URL has the following structure:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://USER:PASSWORD@HOST:PORT/DATABASE"
}
```

Here is an example connection string with a local MySQL database:

```prisma
datasource db {
  provider = "mysql"
  url      = "mysql://janedoe:mypassword@localhost:3306/notesapi"
}
```

### Microsoft SQL Server

Here is an example connection string with a local Microsoft SQL Server database:

```prisma
datasource db {
  provider = "sqlserver"
  url      = "sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
}
```

### MongoDB

Here is an example connection string with a local MongoDB database:

```prisma
datasource db {
  provider = "mongodb"
  url      = "mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
}
```

</details>

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
