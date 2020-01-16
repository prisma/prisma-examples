# GraphQL Server Example

This example shows how to implement a **GraphQL server with JavaScript (Node.js)** based on [Photon.js](https://photonjs.prisma.io/) & [graphql-yoga](https://github.com/prisma/graphql-yoga).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install npm dependencies:

```
cd prisma-examples/introspection-only/javascript/sqlite/graphql
npm install
```

### 2. Introspect the database to get a Prisma schema

When using Prisma with an existing database, the first step is to introspect your database so that you get your Prisma schema. The Prisma schema is needed to generate Prisma's database client: Prisma Client JS.

Run the following command:

```
cd db
npx prisma2 introspect --url sqlite:./dev.db
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

This will introspect the SQLite database file and create a new file called `schema.prisma` (the order of the fields has been changed for readability):

```prisma
datasource db {
  provider = "sqlite"
  url      = "sqlite:./dev.db"
}

model Post {
  id        Int     @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?
}

model User {
  id    Int     @id
  email String  @unique
  name  String?
  posts Post[]
}
```

<Details><Summary>Expand to view the initial SQL schema</Summary>

The above Prisma schema represents the following SQL schema:

```sql
CREATE TABLE "Post" ( 
	"author" TEXT REFERENCES "User"(id) ON DELETE SET NULL, 
	"content" TEXT , 
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	"published" BOOLEAN NOT NULL DEFAULT false , 
	"title" TEXT NOT NULL
);

CREATE TABLE "User" ( 
	"email" TEXT NOT NULL UNIQUE, 
	"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
	"name" TEXT
);
```

</Details>

### 3. Generate Prisma Client JS

To generate Prisma's database client, you first need to add a `generator` block to the generated `schema.prisma`:

```diff
datasource db {
  provider = "sqlite"
  url      = "sqlite:./dev.db"
}

+ generator client {
+   provider = "prisma-client-js"
+ }

model Post {
  id        Int     @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?
}

model User {
  id    Int     @id
  email String  @unique
  name  String?
  posts Post[]
}
```

Now you can navigate back into the project's root directory and generate Prisma Client JS:

```
cd ..
npx prisma2 generate
```

This generates Prisma Client JS into `node_modules/@prisma/client`.

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
  post(where: { id: "__POST_ID__" }) {
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

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Photon.js API](https://github.com/prisma/prisma2/blob/master/docs/photon/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track the Prisma Framework's progress on [`isprisma2ready.com`](https://isprisma2ready.com)