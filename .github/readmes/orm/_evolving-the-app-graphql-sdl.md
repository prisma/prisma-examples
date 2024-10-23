## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add "profile" feature to the app where users can create a profile and write a short bio about themselves.

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
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
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

You can now use your `PrismaClient` instance to perform operations against the new `Profile table.
Those operations can be used to implement queries and mutations in the GraphQL API

#### 2.1 Add the `Profile` type to your GraphQL schema

First, add a new GraphQL type to your existing `typeDefs`:

```diff
// ./src/schema.ts

+type Profile {
+  id: ID!
+  bio: String
+  user: User
+}

type User {
  email: String!
  id: ID!
  name: String
  posts: [Post!]!
+  profile: Profile
}
```

Don't forget to include `Profile` and update `User` root types in the `resolvers` object

```diff

const resolvers ={
  Query: { /** as before */ },
  Mutation: { /** as before */ },
  DateTime: DateTimeResolver,
  Post: { /** as before */ },
  User: {
    posts: (parent, _args, context: Context) => {
      return context.prisma.user.findUnique({
        where: { id: parent?.id }
      }).posts()
    },
+    profile: (parent, _args, context: Context) => {
+      return context.prisma.user.findUnique({
+        where: { id: parent?.id }
+      }).profile()
+    }
  },
+  Profile: {
+    user: (parent, _args, context: Context) => {
+      return context.prisma.profile.findUnique({
+        where: { id: parent?.id }
+      }).user()
+    }
+  }
}
```

#### 2.2 Add a `createProfile` GraphQL mutation

```diff
// ./src/schema.ts

const typeDefs = `
// other types

type Mutation {
  createDraft(authorEmail: String!, data: PostCreateInput!): Post
  deletePost(id: Int!): Post
  incrementPostViewCount(id: Int!): Post
  signupUser(data: UserCreateInput!): User!
  togglePublishPost(id: Int!): Post
+  addProfileForUser(bio: String, userUniqueInput: UserUniqueInput): Profile
}
`

const resolvers ={
  Query: { /** as before */ },
  Mutation: {
    // other mutations

+    addProfileForUser: (_parent, args: { userUniqueInput: UserUniqueInput, bio: string }, context: Context) => {
+      return context.prisma.profile.create({
+        data: {
+          bio: args.bio,
+          user: {
+            connect: {
+              id: args.userUniqueInput?.id,
+              email: args.userUniqueInput?.email
+            }
+          }
+        }
+      })
+    }
  },
  DateTime: DateTimeResolver,
  Post: { /** as before */ },
  User: { /** as before */},
  Profile: { /** as before */  }
}
```


Finally, you can test the new mutation like this:

```graphql
mutation {
  addProfileForUser(
    userUniqueInput: {
      email: "mahmoud@prisma.io"
    }
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
