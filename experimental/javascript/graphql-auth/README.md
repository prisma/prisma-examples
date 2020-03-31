# GraphQL Server with Authentication & Permissions

This example shows how to implement a **GraphQL server with an email-password-based authentication workflow and authentication rules** based on [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md), [graphql-yoga](https://github.com/prisma/graphql-yoga) & [graphql-shield](https://github.com/maticzav/graphql-shield).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install Node dependencies:

```
cd prisma-examples/experimental/javascript/graphql-auth
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Migrate your database schema

Perform an initial schema migration against your database using the following commands:

```
npx prisma migrate save --name 'init' --experimental
npx prisma migrate up --experimental
```

The first step will save the migration in the `prisma/migrations` folder. The second step will execute the migrations.

> **Note**: You're using [npx](https://github.com/npm/npx) to run Prisma 2 CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g @prisma/cli`. When using Yarn, you can run: `yarn prisma dev`.

<Details>
<Summary><b>Alternative: </b>Connect to your own database</Summary>

Prisma supports MySQL and PostgreSQL at the moment. If you would like to connect to your own database, you can do so by specifying a different data source in the [Prisma schema file](prisma/schema.prisma).

For a MySQL provider:

```prisma
datasource mysql {
    provider = "mysql"
    url      = "mysql://johndoe:secret42@localhost:3306/mydatabase"
}
```

*OR*

For a PostgreSQL provider:

```prisma
datasource postgresql {
  provider = "postgresql"
  url      = "postgresql://johndoe:secret42@localhost:5432/mydatabase?schema=public"
}
```

> **Note**: In the above example connection strings, `johndoe` would be the username to your database, `secret42` the password, `mydatabase` the name of your database, and `public` the [PostgreSQL schema](https://www.postgresql.org/docs/9.1/ddl-schemas.html).

</Details>

### 3. Generate Prisma Client

Run the following command to generate your Prisma Client API:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

### 4. Seed the database with test data

The `seed` script from `package.json` contains some code to seed the database with test data. Execute it with the following command:

```
npm run seed
```

### 5. Start the GraphQL server

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

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

<Details><Summary><strong>See more API operations</strong></Summary>

### Register a new user

You can send the following mutation in the Playground to sign up a new user and retrieve an authentication token for them:

```graphql
mutation {
  signup(name: "Sarah", email: "sarah@prisma.io", password: "graphql") {
    token
  }
}
```

### Log in an existing user

This mutation will log in an existing user by requesting a new authentication token for them:

```graphql
mutation {
  login(email: "sarah@prisma.io", password: "graphql") {
    token
  }
}
```

### Check whether a user is currently logged in with the `me` query

For this query, you need to make sure a valid authentication token is sent along with the `Bearer`-prefix in the `Authorization` header of the request:

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a real token, this looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanAydHJyczFmczE1MGEwM3kxaWl6c285IiwiaWF0IjoxNTQzNTA5NjY1fQ.Vx6ad6DuXA0FSQVyaIngOHYVzjKwbwq45flQslnqX04"
}
```

Inside the Playground, you can set HTTP headers in the bottom-left corner:

![](https://imgur.com/ToRcCTj.png)

Once you've set the header, you can send the following query to check whether the token is valid:

```graphql
{
  me {
    id
    name
    email
  }
}
```

### Create a new draft

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

```graphql
mutation {
  createDraft(
    title: "Join the Prisma Slack"
    content: "https://slack.prisma.io"
  ) {
    id
    published
  }
}
```

### Publish an existing draft

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

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

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. 

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

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. 

```graphql
{
  post(id: __POST_ID__) {
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

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>

## Evolving the app with Prisma Migrate

Evolving the application typically requires four subsequent steps:

1. Update your Prisma schema
1. Save and migrate the database schema using Prisma Migrate
1. Generate Prisma Client to match the new schema with `prisma generate`
1. Use the updated Prisma Client in your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a single profile (1:1 relationship) and write a short bio about themselves and add a link to an image.

### 1. Update your Prisma schema

The first step would be to add a new model to the Prisma schema, e.g. called `Profile`. Prisma Migrate will create a corresponding table in the database.

To define a `1:1` relationship between `User` and `Profile`, you need to specify the relation field on both models as follows:

Add the Profile model with a `user` field of type `User`:

```prisma
model Profile {
  id       Int    @id @default(autoincrement())
  user     User
  bio      String
  imageURL String?
}
```

Add the `Profile` relation field to the `User` model:

```diff
model User {
   id      Int      @id @default(autoincrement())
   email   String   @unique
   name    String?
   posts   Post[]
+  profile Profile?
}
```

### 2. Save and run the migration

#### Save the migration

To migrate the database schema you first need to save the migration as follows:

```
npx prisma migrate save --name 'add-profile' --experimental
```

The CLI will output the planned changes and save the migration files in `prisma/migrations/20200313000000-add-profile/` (they contain details about required migrations steps and SQL operations).

#### Run the migration

Now that the migration has been saved you can run the migration as follows:

```
npx prisma migrate up --experimental
```

This will actually perform the schema migration against the database.

Assuming everything went right, the CLI should output:

```
🚀    Done with 1 migration
```

### 3. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.
### 4. Use the updated Prisma Client in your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table.

Additionally, you need to expose `Profile` through your GraphQL API.

#### Using the updated Prisma Client

##### Create a new profile for an existing user

```ts
const profile = await prisma.profile.create({
  data: {
    bio: 'Hello World',
    imageURL: 'https://cdn.com/alice.png',
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
        imageURL: 'https://cdn.com/john.png',
      },
    },
  },
})
```

#### Exposing profile on the GraphQL API

With the `nexus-prisma` package, exposing the new `Profile` model in the API involves the following:

1. Project the `Profile` model onto your GraphQL schema
2. Add the `profile` field to the `User` GraphQL object
3. Add `profile` query type for fetching single profiles
4. Add the `Profile` object to your GraphQL schema

##### 1. Project the `Profile` model onto your GraphQL schema

To project the `Profile` model, define a new object type:

```js
const Profile = objectType({
  name: 'Profile',
  definition(t) {
    t.model.id()
    t.model.user()
    t.model.bio()
    t.model.imageURL()
  },
})
```

Here we project the profile model fields from the Prisma schema with the `t.model` methods, which are exposed by [nexus-prisma](https://github.com/graphql-nexus/nexus-prisma).

##### 2. Add the `profile` field to the `User` GraphQL object

```diff
const User = objectType({
  name: 'User',
  definition(t) {
    // existing fields omitted
+   t.model.profile()
  },
})
```

This allows selecting associated profile fields when fetching a user.

##### 3. Add `profile` query type for fetching single profiles

Add the `t.crud.profile()` to the `Query` object type:

```diff
const Query = objectType({
  name: 'Query',
  definition(t) {
    // ...
+   t.crud.profile()
```

This allows querying single profiles as follows:

```graphql
{
  profile(where: { id: 1 }) {
    id
    bio
  }
}
```

##### 4. Add the `Profile` object to your GraphQL schema

Pass the `Profile` object defined in step 1 to the `makeSchema` `types` parameter:

```diff
makeSchema({
-    types: [Query, Mutation, Post, User],
+    types: [Query, Mutation, Post, User, Profile],
})
```

Note that the [`dev`](./package.json) script starts a development server that automatically updates your schema every time you save a file. This way, the auto-generated [GraphQL schema](./schema.graphql) updates whenever you make changes the `Query` or `Mutation` types inside your code.

## Next steps

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Prisma Client API](https://github.com/prisma/prisma2/tree/master/docs/prisma-client-js/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track Prisma 2's progress on [`isprisma2ready.com`](https://isprisma2ready.com)

