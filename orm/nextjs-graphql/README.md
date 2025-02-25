# Fullstack Example with Next.js (GraphQL API) & Prisma Postgres

This example shows how to implement a **Fullstack Next.js app with GraphQL** with the following stack:

This example shows how to implement a **fullstack app in TypeScript with :
- [**Next.js**](https://nextjs.org/): A [React](https://reactjs.org/) framework
- [**Apollo Client**](https://www.apollographql.com/docs/react/) (frontend),
- [**GraphQL Yoga**](https://the-guild.dev/graphql/yoga-server): GraphQL server
- [**Pothos**](https://pothos-graphql.dev/): Code-first GraphQL schema definition library
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations
- [**Prisma Postgres**](https://www.prisma.io/postgres): A serverless PostgreSQL database built on unikernels.

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/nextjs-graphql --install npm --name nextjs-graphql
```

Then, navigate into the project directory:

```
cd nextjs-graphql
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/nextjs-graphql
npm install
```

</details>

### 2. Create and seed the database

Create a new [Prisma Postgres](https://www.prisma.io/docs/postgres/overview) database by executing:

```terminal
npx prisma init --db
```

If you don't have a [Prisma Data Platform](https://console.prisma.io/) account yet, or if you are not logged in, the command will prompt you to log in using one of the available authentication providers. A browser window will open so you can log in or create an account. Return to the CLI after you have completed this step.

Once logged in (or if you were already logged in), the CLI will prompt you to:
1. Select a **region** (e.g. `us-east-1`)
1. Enter a **project name**

After successful creation, you will see output similar to the following:

<details>

<summary>CLI output</summary>

```terminal
Let's set up your Prisma Postgres database!
? Select your region: ap-northeast-1 - Asia Pacific (Tokyo)
? Enter a project name: testing-migration
✔ Success! Your Prisma Postgres database is ready ✅

We found an existing schema.prisma file in your current project directory.

--- Database URL ---

Connect Prisma ORM to your Prisma Postgres database with this URL:

prisma+postgres://accelerate.prisma-data.net/?api_key=...

--- Next steps ---

Go to https://pris.ly/ppg-init for detailed instructions.

1. Install and use the Prisma Accelerate extension
Prisma Postgres requires the Prisma Accelerate extension for querying. If you haven't already installed it, install it in your project:
npm install @prisma/extension-accelerate

...and add it to your Prisma Client instance:
import { withAccelerate } from "@prisma/extension-accelerate"

const prisma = new PrismaClient().$extends(withAccelerate())

2. Apply migrations
Run the following command to create and apply a migration:
npx prisma migrate dev

3. Manage your data
View and edit your data locally by running this command:
npx prisma studio

...or online in Console:
https://console.prisma.io/{workspaceId}/{projectId}/studio

4. Send queries from your app
If you already have an existing app with Prisma ORM, you can now run it and it will send queries against your newly created Prisma Postgres instance.

5. Learn more
For more info, visit the Prisma Postgres docs: https://pris.ly/ppg-docs
```

</details>

Locate and copy the database URL provided in the CLI output. Then, create a `.env` file in the project root:

```bash
touch .env
```

Now, paste the URL into it as a value for the `DATABASE_URL` environment variable. For example:

```bash
# .env
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=ey...
```

Run the following command to create tables in your database. This creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```terminal
npx prisma migrate dev --name init
```

Execute the seed file in [`prisma/seed.ts`](./prisma/seed.ts) to populate your database with some sample data, by running:

```terminal
npx prisma db seed
```

### 2. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.tsx`](./pages/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.tsx`](./pages/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.tsx`](./pages/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/[id].tsx`](./pages/p/[id].tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

## Using the GraphQL API

You can also access the GraphQL API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is [`localhost:3000/api`](http://localhost:3000/api)).

Below are a number of operations that you can send to the API.

### Retrieve all published posts and their authors

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

### Create a new user

```graphql
mutation {
  signupUser(name: "Sarah", email: "sarah@prisma.io") {
    id
  }
}
```

### Create a new draft

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Discord"
    content: "https://pris.ly/discord"
    authorEmail: "alice@prisma.io"
  ) {
    id
    published
  }
}
```

### Publish an existing draft

```graphql
mutation {
  publish(postId: "__POST_ID__") {
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

### Search for posts with a specific title or content

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

### Retrieve a single post

```graphql
{
  post(postId: "__POST_ID__") {
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

### Delete a post

```graphql
mutation {
  deletePost(postId: "__POST_ID__") {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>


## Evolving the app

Evolving the application typically requires three steps:

1. Migrate your database using Prisma Migrate
1. Update your server-side application code
1. Build new UI features in React

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// ./prisma/schema.prisma

model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User?    @relation(fields: [authorId], references: [id])
  authorId  Int?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev --name add-profile
```

This adds another migration to the `prisma/migrations` directory and creates the new `Profile` table in the database.

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement queries and mutations in the GraphQL API.

#### 2.1. Add the `Profile` type to your GraphQL schema

First, add a new GraphQL type via Pothos's `prismaObject` function:

```diff
// ./pages/api/graphql.ts

+builder.prismaObject('Profile', {
+  fields: (t) => ({
+    id: t.exposeInt('id'),
+    bio: t.exposeString('bio', { nullable: true }),
+    user: t.relation('user'),
+  }),
+})

builder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name', { nullable: true }),
    email: t.exposeString('email'),
    posts: t.relation('posts'),
+    profile: t.relation('profile'),
  }),
})
```

#### 2.2. Add a `createProfile` GraphQL mutation

```diff
// ./pages/api/graphql.ts

// other object types, queries and mutations


+builder.mutationField('createProfile', (t) =>
+  t.prismaField({
+    type: 'Profile',
+    args: {
+      bio: t.arg.string({ required: true }),
+      data: t.arg({ type: UserUniqueInput })
+    },
+    resolve: async (query, _parent, args, _context) =>
+      prisma.profile.create({
+        ...query,
+        data: {
+          bio: args.bio,
+          user: {
+            connect: {
+              id: args.data?.id || undefined,
+              email: args.data?.email || undefined
+            }
+          }
+        }
+      })
+  })
+)
```

Finally, you can test the new mutation like this:

```graphql
mutation {
  createProfile(
    email: "mahmoud@prisma.io"
    bio: "I like turtles"
  ) {
    id
    bio
    user {
      id
      name
    }
  }
}
```

<details><summary>Expand to view more sample Prisma Client queries on <code>Profile</code></summary>

Here are some more sample Prisma Client queries on the new <code>Profile</code> model:

##### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    user: {
      connect: { email: 'alice@prisma.io' },
    },
  },
})
```

##### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: 'john@prisma.io',
    name: 'John',
    profile: {
      create: {
        bio: 'Hello World',
      },
    },
  },
})
```

##### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: 'alice@prisma.io' },
  data: {
    profile: {
      update: {
        bio: 'Hello Friends',
      },
    },
  },
})
```

</details>

### 3. Build new UI features in React

Once you have added a new query or mutation to the API, you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new operations via Apollo Client and populate the UI with the data you receive from the API calls.

## Switch to another database (e.g. SQLite, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than Postgres, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block.

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### Remove the Prisma Client extension

Before you proceed to use your own database, you should remove the Prisma client extension required for Prisma Postgres:

```terminal
npm uninstall @prisma/extension-accelerate
```

Remove the client extension from your `PrismaClient`:

```diff
- const prisma = new PrismaClient().$extends(withAccelerate())
+ const prisma = new PrismaClient()
```

### Your own PostgreSQL database

To use your own PostgreSQL database remove the `@prisma/extension-accelerate` package and remove the Prisma client extension.

### SQLite

Modify the `provider` value in the `datasource` block in the [`prisma.schema`](./prisma/schema.prisma) file:

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

Create an `.env` file and add the SQLite database connection string in it. For example:

```terminal
DATABASE_URL="file:./dev.db""
```

### MySQL

Modify the `provider` value in the `datasource` block in the [`prisma.schema`](./prisma/schema.prisma) file:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

Create an `.env` file and add a MySQL database connection string in it. For example:

```terminal
## This is a placeholder url
DATABASE_URL="mysql://janedoe:mypassword@localhost:3306/notesapi"
```

### Microsoft SQL Server

Modify the `provider` value in the `datasource` block in the [`prisma.schema`](./prisma/schema.prisma) file:

```prisma
datasource db {
  provider = "sqlserver"
  url      = env("DATABASE_URL")
}
```

Create an `.env` file and add a Microsoft SQL Server database connection string in it. For example:

```terminal
## This is a placeholder url
DATABASE_URL="sqlserver://localhost:1433;initial catalog=sample;user=sa;password=mypassword;"
```

### MongoDB

Modify the `provider` value in the `datasource` block in the [`prisma.schema`](./prisma/schema.prisma) file:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}
```

Create an `.env` file and add a local MongoDB database connection string in it. For example:

```terminal
## This is a placeholder url
DATABASE_URL="mongodb://USERNAME:PASSWORD@HOST/DATABASE?authSource=admin&retryWrites=true&w=majority"
```

</details>

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
