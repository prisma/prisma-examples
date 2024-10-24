# Fullstack Example with Remix

This example shows how to implement a **fullstack app in TypeScript with [Remix](https://remix.run/)** using [React](https://reactjs.org/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/remix
__INLINE(../_setup-1.md)__
cd remix
__INLINE(../_setup-2.md)__
cd prisma-examples/remix
__INLINE(../_setup-3.md)__

### 3. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./app/routes/index.tsx`](./app/routes/index.tsx))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./app/routes/signup.tsx`](./app/routes/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./app/routes/create.tsx`](./app/routes/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./app/routes/drafts.tsx`](./app/routes/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./app/routes/p/[id].tsx`](./app/routes/p/$id.tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

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


### 3. Build new UI features in React

Once you have added the loaders and actions, you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new endpoint via `fetch` operations and populate the UI with the data you receive from the API calls.


__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
