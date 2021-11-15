# GraphQL Server Example

This example shows how to **implement a GraphQL server with TypeScript** based on [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client), [apollo-server](https://www.apollographql.com/docs/apollo-server). It is based on a SQLite database - you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Download example and install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/graphql-typegraphql-crud
```

Install npm dependencies:

```
cd graphql-typegraphql-crud
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/graphql-typegraphql-crud
npm install
```

</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed
```


### 3. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Using the GraphQL API

`typegraphql-prisma` emits the generated TypeGraphQL classes to `node_modules/@generated/typegraphql-prisma` whenever `npx prisma generate` is invoked. 

It also generates a number of model classes, enums as well CRUD and relation resolver based on your `schema.prisma` file. The generated CRUD resolvers match the operations of the [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference):

- `create`
- `update`
- `delete`
- `findUnique`
- `findFirst`
- `findMany`
- `updateMany`
- `deleteMany`
- `upsert`
- `aggregate`
- `groupBy`

Below are example operations that you can send to the API using the GraphQL Playground. You can explore other operations in the **Docs** section of the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  posts {
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
  createUser(data: {
    name: "Sarah",
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
  createPost(
    data: {
      title: "Join the Prisma Slack",
      content: "https://slack.prisma.io"
      author: {
        connect: {
          email: "alice@prisma.io"
        }
      }
    }
  ) {
    id
    published
  }
}
```

#### Publish an existing draft

```graphql
mutation {
  updatePost(data: { published: { set: true } }, where: { id: __POST_ID__ }){
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Search for posts with a specific title or content

```graphql
{
  posts(
    where: {
      OR: { content: { contains: "graphql" }, title: { contains: "graphql" } }
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

#### Retrieve a single post

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

#### Delete a post

```graphql
mutation{
  deletePost(where:{id: __POST_ID__}){
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>


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

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement new queries and mutations in the GraphQL API.

#### 2.1. Use the updated Prisma Client in your application code

#### 2.1. Create GraphQL type for `Profile` model using TypeGraphQL

You can use TypeGraphQL to expose the new `Profile` model. Create a new file named `src\Profile.ts` and add the following code:

```ts
import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class Profile {
  @Field((type) => ID)
  id: number;

  @Field((type) => User, { nullable: true })
  user?: User | null;

  @Field((type) => String, { nullable: true })
  bio?: string | null;
}
```

Create a new file named `src\ProfileCreateInput.ts` with the following code:

```ts
import "reflect-metadata";
import { ObjectType, Field, ID, InputType } from "type-graphql";
import { User } from "./User";

@InputType()
export class ProfileCreateInput {
  @Field((type) => String, { nullable: true })
  bio?: string | null;
}
```

Add the `profile` field to `src\User.ts` and import the `Profile` class.

```ts
@Field(type => Profile, { nullable: true })
profile?: Profile | null;
```

Add the `profile` field to `src\UserCreateInput.ts` and import the `ProfileCreateInput` class:

```ts
@Field(type => ProfileCreateInput, { nullable: true })
profile?: ProfileCreateInput | null;
```

Extend the `src\UserResolver.ts` class with an additional field resolver:

```ts
@FieldResolver()
async profile(@Root() user: User, @Ctx() ctx: Context): Promise<Profile> {
  return (await ctx.prisma.user.findUnique({
    where: {
      id: user.id
    }
  }).profile())!
}
```

Update the `signupUser` mutation to include the option to create a profile when you sign up a new user:

```ts
@Mutation(returns => User)
async signupUser(
  @Arg("data") data: UserCreateInput,
  @Ctx() ctx: Context): Promise<User> {
  try {
    return await ctx.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        profile: {
          create: {
            bio: data.bio?.bio
          }
        }
      }
    });
  }
  catch (error) {
    throw error;
  }
}
```

Run the following mutation to create a user with a profile:

```graphql
mutation {
  signupUser(data: {
    email:"katla@prisma.io", 
    profile: { bio: "Sometimes I'm an Icelandic volcano, sometimes I'm a dragon from a book."}
  })
  {
    id
    email
    posts {
      title
    }
    profile {
      id
      bio
    }
  }
}
```

Run the following query to return a user and their profile:

```graphql
query {
  user(id: 1) {
    email
    profile {
      id
      bio
    }
    posts {
      title
      content
    }
  }
}
```

#### 2.2. Update usage of Prisma Client

As the Prisma Client API was updated, you can now also invoke "raw" operations via `prisma.profile` directly.

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
Because MongoDB is currently in [Preview](https://www.prisma.io/docs/about/releases#preview), you need to specify the `previewFeatures` on your `generator` block:

```
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["mongodb"]
}
```
</details>

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`prisma2`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)
