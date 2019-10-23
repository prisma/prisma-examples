# GraphQL Server Example

This example shows how to implement a **GraphQL server with JavaScript (Node.js)** based on [Photon.js](https://photonjs.prisma.io/) & [graphql-yoga](https://github.com/prisma/graphql-yoga).

## How to use

### 1. Download example & install dependencies

Clone the `prisma2` branch of this repository:

```
git clone --single-branch --branch prisma2 git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/javascript/graphql
npm install
```

### 2. Run Prisma's development mode

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

### 3. Seed the database with test data

The `seed` script from `package.json` contains some code to seed the database with test data. Execute it with the following command:

```
npm run seed
```

> **Note**: You need to execute the command in a new terminal window/tab, since the development mode is taking up your currrent terminal session.


### 4. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### 5. Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./src/schema.graphql`](./src/schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Create a new user

```graphql
mutation {
  signupUser(
    data: {
      name: "Sarah"
      email: "sarah@prisma.io"
    }
  ) {
    id
  }
}
```

#### Create a new draft

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Slack"
    content: "https://slack.prisma.io"
    authorEmail: "alice@prisma.io"
  ) {
    id
    published
  }
}
```

#### Publish an existing draft

```graphql
mutation {
  publish(id: "__POST_ID__") {
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Search for posts with a specific title or content

```graphql
{
  filterPosts(searchString: "graphql") {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

#### Retrieve a single post

```graphql
{
  post({
    where: { id: "__POST_ID__" }
  }) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Delete a post

```graphql
mutation {
  deleteOnePost(where: {id: "__POST_ID__"})
  {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>


## Next steps

### Use Lift to persist the schema migration

The migrations that were generated throughout the development mode are _development migrations_ that are thrown away once the desired schema has been found. In that case, you need to persist the schema using the `lift` subcommands.

To persist your schema migration with Lift, run:

```
npx prisma2 lift save --name 'init'
npx prisma2 lift up
```

The first command, `lift save`, stores a number of migration files on the file sytem with details about the migration (such as the required migration steps and SQL operations), this doesn't yet affect the database. It also deletes the old development migrations. The second command, `lift up`, actually performs the schema migration against the database.

### Generate Photon.js with the CLI

Sometimes, e.g. in CI/CD environments, it can be helpful to generate Photon.js with a CLI command. This can be done with the `prisma2 generate command`. If you want to run it in this project, you need to prepend `npx` again:

```
npx prisma2 generate
```

### More things to explore

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Photon.js API](https://github.com/prisma/prisma2/blob/master/docs/photon/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track the Prisma Framework's progress on [`isprisma2ready.com`](https://isprisma2ready.com)