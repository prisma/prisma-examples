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

First, add a new GraphQL type via Nexus' `objectType` function:

```diff
// ./pages/api/index.ts

+const Profile = objectType({
+  name: 'Profile',
+  definition(t) {
+    t.nonNull.int('id')
+    t.string('bio')
+    t.field('user', {
+      type: 'User',
+      resolve: (parent) => {
+        return prisma.profile
+          .findUnique({
+            where: { id: parent.id || undefined },
+          })
+          .user()
+      },
+    })
+  },
+})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.int('id')
    t.string('name')
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve: (parent) => {
        return prisma.user
          .findUnique({
            where: { id: parent.id || undefined },
          })
          .posts()
      },
    })
+   t.field('profile', {
+     type: 'Profile',
+     resolve: (parent) => {
+       return prisma.user.findUnique({
+         where: { id: parent.id }
+       }).profile()
+     }
+   })
  },
})
```

Don't forget to include the new type in the `types` array that's passed to `makeSchema`:

```diff
export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    Post,
    User,
+   Profile,
    GQLDate
  ],
  // ... as before
}
```

Note that in order to resolve any type errors, your development server needs to be running so that the Nexus types can be generated. If it's not running, you can start it with `npm run dev`.

#### 2.2. Add a `createProfile` GraphQL mutation

```diff
// ./pages/api/index.ts

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {

    // other mutations

+   t.field('addProfileForUser', {
+     type: 'Profile',
+     args: {
+       email: stringArg(),
+       bio: stringArg()
+     }, 
+     resolve: async (_, args) => {
+       return prisma.profile.create({
+         data: {
+           bio: args.bio,
+           user: {
+             connect: {
+               email: args.email || undefined,
+             }
+           }
+         }
+       })
+     }
+   })

  }
})
```

Finally, you can test the new mutation like this:

```graphql
mutation {
  addProfileForUser(
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
