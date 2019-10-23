# React & GraphQL Fullstack Example

### 1. Download example & install dependencies of React app

Clone the `prisma2` branch of this repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install Node dependencies of your React app:

```
cd prisma-examples/misc/react-graphql-fullstack
npm install
```

### 2. Prepare and start the server

#### 2.1. Install dependencies of GraphQL server

Navigate into the `server` directory and install Node dependencies there:

```
cd server
npm install
```

#### 2.2. Run Prisma's development mode

<Details><Summary>Learn more about the development mode</Summary>

Prisma's [development mode](https://github.com/prisma/prisma2/blob/master/docs/development-mode.md) watches your [Prisma schema](https://github.com/prisma/prisma2/blob/master/docs/prisma-schema-file.md) on the file system. Whenever there's a change in the schema, the Prisma Framework CLI performs two major tasks in the background:

- map the Prisma schema to your database schema (i.e., perform a schema migration in the database) 
- regenerate the Photon.js database client based on the new Prisma schema

It also runs a web server to host [Prisma Studio](https://github.com/prisma/studio), typically at [`http://localhost:5555`](http://localhost:5555).

In this case, the command also creates a new [SQLite database](https://www.sqlite.org/index.html) file at `./prisma/dev.db` since that didn't exist in the project yet.

</Details>

Start the development mode with the following command:

```
npx prisma2 dev
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

You can now open [Prisma Studio](https://github.com/prisma/studio). Open your browser and navigate to the URL displayed by the CLI output (typically at [`http://localhost:5555`](http://localhost:5555)).

<Details>
<Summary><b>Alternative: </b>Connect to your own database</Summary>

Prisma supports MySQL and PostgreSQL at the moment. If you would like to connect to your own database, you can do so by specifying a different data source in the [Prisma schema file](prisma/schema.prisma).

For a MySQL provider:
```
datasource mysql {
    provider = "mysql"
    url      = "mysql://johndoe:secret42@localhost:3306/mydatabase"
}
```

*OR*

For a PostgreSQL provider:
```
datasource postgresql {
  provider = "postgresql"
  url      = "postgresql://johndoe:secret42@localhost:5432/mydatabase?schema=public"
}
```

> Note: In the above example connection strings, `johndoe` would be the username to your database, `secret42` the password, `mydatabase` the name of your database, and `public` the [PostgreSQL schema](https://www.postgresql.org/docs/9.1/ddl-schemas.html). 

Then to migrate your database schema, run:

```sh
npx prisma2 lift save --name 'init'
npx prisma2 lift up
```

</Details>

#### 2.3. Seed the database with test data

The `seed` script from `package.json` contains some code to seed the database with test data. Execute it with the following command:

```
npm run seed
```

> **Note**: You need to execute the command in a new terminal window/tab, since the development mode is taking up your currrent terminal session.


#### 2.4. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 3. Start the React application

Navigate back into the project's root directory and start the React app:

```
cd ..
npm run dev
```

You can now open your browser at [http://localhost:3000](http://localhost:3000) and use the React app.