# GraphQL Server Example with NestJS (code-first)

This example shows how to implement an **GraphQL server (code-first) with TypeScript** with the following stack:

- [NestJS](https://docs.nestjs.com/graphql/quick-start): Web framework for building scalable server-side applications
- [**Prisma Client**](https://www.prisma.io/docs/concepts/components/prisma-client): Databases access (ORM)                  
- [**Prisma Migrate**](https://www.prisma.io/docs/concepts/components/prisma-migrate): Database migrations               
- [**SQLite**](https://www.sqlite.org/index.html): Local, file-based SQL database

The example was bootstrapped using the NestJS CLI command `nest new graphql-nestjs`.

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-nestjs
```

Install npm dependencies:

```
cd graphql-nestjs
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/graphql-nestjs
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 2. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).


## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

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

<details><summary><strong>See more API operations</strong></summary>

### Retrieve the drafts of a user

```graphql
{
  draftsByUser(
    userUniqueInput: {
      email: "mahmoud@prisma.io"
    }
  ) {
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


### Create a new user

```graphql
mutation {
  signupUser(data: { name: "Sarah", email: "sarah@prisma.io" }) {
    id
  }
}
```

### Create a new draft

```graphql
mutation {
  createDraft(
    data: { title: "Join the Prisma Slack", content: "https://slack.prisma.io" }
    authorEmail: "alice@prisma.io"
  ) {
    id
    viewCount
    published
    author {
      id
      name
    }
  }
}
```

### Publish/unpublish an existing post

```graphql
mutation {
  togglePublishPost(id: __POST_ID__) {
    id
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  togglePublishPost(id: 5) {
    id
    published
  }
}
```

### Increment the view count of a post

```graphql
mutation {
  incrementPostViewCount(id: __POST_ID__) {
    id
    viewCount
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  incrementPostViewCount(id: 5) {
    id
    viewCount
  }
}
```

### Search for posts that contain a specific string in their title or content

```graphql
{
  feed(
    searchString: "prisma"
  ) {
    id
    title
    content
    published
  }
}
```

### Paginate and order the returned posts

```graphql
{
  feed(
    skip: 2
    take: 2
    orderBy: { updatedAt: desc }
  ) {
    id
    updatedAt
    title
    content
    published
  }
}
```

### Retrieve a single post

```graphql
{
  postById(id: __POST_ID__ ) {
    id
    title
    content
    published
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
{
  postById(id: 5 ) {
    id
    title
    content
    published
  }
}
```

### Delete a post

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

Note that you need to replace the `__POST_ID__` placeholder with an actual `id` from a `Post` record in the database, e.g.`5`:

```graphql
mutation {
  deletePost(id: 5) {
    id
  }
}
```

</details>

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `Profile`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// schema.prisma

model Post {
  id        Int     @default(autoincrement()) @id
  title     String
  content   String?
  published Boolean @default(false)
  author    User?   @relation(fields: [authorId], references: [id])
  authorId  Int
}

model User {
  id      Int      @default(autoincrement()) @id 
  name    String? 
  email   String   @unique
  posts   Post[]
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  userId Int     @unique
+  user   User    @relation(fields: [userId], references: [id])
+}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Here are some examples:

#### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: "Hello World",
    user: {
      connect: { email: "alice@prisma.io" },
    },
  },
});
```

#### Create a new user with a new profile

```ts
const user = await prisma.user.create({
  data: {
    email: "john@prisma.io",
    name: "John",
    profile: {
      create: {
        bio: "Hello World",
      },
    },
  },
});
```

#### Update the profile of an existing user

```ts
const userWithUpdatedProfile = await prisma.user.update({
  where: { email: "alice@prisma.io" },
  data: {
    profile: {
      update: {
        bio: "Hello Friends",
      },
    },
  },
});
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`prisma2`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)