# Fullstack Example with Next.js (GraphQL API)

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/), [Apollo Client](https://www.apollographql.com/docs/react/) (frontend), [Nexus Schema](https://nxs.li/components/standalone/schema) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

### 1. Download example & install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-nextjs
```

Install npm dependencies:
```
cd graphql-nextjs
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

<Details><Summary><strong>Alternative:</strong> Clone the entire repo</Summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/graphql-nextjs
npm install
```

</Details>

### 2. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx)

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

### Create a new draft

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

### Publish an existing draft

```graphql
mutation {
  publish(id: __POST_ID__) {
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
  post(where: { id: __POST_ID__ }) {
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
  deleteOnePost(where: {id: __POST_ID__})
  {
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
npx prisma migrate dev --preview-feature
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement new queries and mutations in the GraphQL API.

#### 2.1. Create GraphQL type for `Profile` model using Nexus

Similar to the existing `User` and `Post` types, you can define a new GraphQL type using Nexus' `objectType` function. You can then optionally use `t.model` from the `nexus-plugin-prisma` package to auto-resolve the fields of the type against the database (you are then [projecting the fields of a Prisma model](https://nexusjs.org/docs/plugins/prisma/overview#projecting-prisma-model-fields) to your GraphQL schema):

```diff

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.email()
    t.model.posts({
      pagination: false,
    })
+   t.model.profile()
  },
})

+const Profile = objectType({
+  name: 'Profile',
+  definition(t) {
+    t.model.id()
+    t.model.bio()
+    t.model.user()
+  },
+})

export const schema = makeSchema({
+  types: [Query, Mutation, Post, User, Profile],
  // ... as before
}
```

#### 2.2. Update usage of Prisma Client

As the Prisma Client API was updated, you can now also invoke "raw" operations via `prisma.profile` directly. You can use these operations inside of new resolvers functions that you implement on the `Query` or `Mutation` types.

##### Create a new profile for an existing user

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

##### Create a new user with a new profile

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

##### Update the profile of an existing user

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

### 3. Build new UI features in React

Once you have added a new query or mutation to the API, you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new operations via Apollo Client and populate the UI with the data you receive from the API calls.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`prisma2`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)

