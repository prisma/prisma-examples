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