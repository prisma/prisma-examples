# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) (frontend), [Express](https://expressjs.com/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/rest-nextjs
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

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

## Using the REST API

You can also access the REST API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is `localhost:3000/api/`, so you can e.g. reach the API with [`localhost:3000/api/feed`](http://localhost:3000/api/feed)).

### `GET`

- `/api/post/:id`: Fetch a single post by its `id`
- `/api/feed`: Fetch all _published_ posts
- `/api/filterPosts?searchString={searchString}`: Filter posts by `title` or `content`

### `POST`

- `/api/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/api/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

### `PUT`

- `/api/publish/:id`: Publish a post by its `id`

### `DELETE`
  
- `/api/post/:id`: Delete a post by its `id`

## Evolving the app

Evolving the application typically requires five subsequent steps:

1. Migrating the database schema using SQL
1. Updating your Prisma schema by introspecting the database with `prisma introspect`
1. Generating Prisma Client to match the new database schema with `prisma generate`
1. Using the updated Prisma Client in your application code and extending the REST API
1. Building new UI features in React

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Change your database schema using SQL

The first step would be to add a new table, e.g. called `Profile`, to the database. In SQLite, you can do so by running the following SQL statement:

```sql
CREATE TABLE "Profile" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "bio" TEXT,
  "user" TEXT NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE SET NULL
);
```

To run the SQL statement against the database, you can use the `sqlite3` CLI in your terminal, e.g.:

```bash
sqlite3 dev.db \
'CREATE TABLE "Profile" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "bio" TEXT,
  "user" TEXT NOT NULL UNIQUE REFERENCES "User"(id) ON DELETE SET NULL
);'
```

Note that we're adding a unique constraint to the foreign key on `user`, this means we're expressing a 1:1 relationship between `User` and `Profile`, i.e.: "one user has one profile".

While your database now is already aware of the new table, you're not yet able to perform any operations against it using Prisma Client. The next two steps will update the Prisma Client API to include operations against the new `Profile` table.

### 2. Introspect your database

The Prisma schema is the foundation for the generated Prisma Client API. Therefore, you first need to make sure the new `Profile` table is represented in it as well. The easiest way to do so is by introspecting your database:

```
npx prisma introspect
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run Prisma 2 CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g @prisma/cli`. When using Yarn, you can run: `yarn prisma dev`.

The `introspect` command updates your `schema.prisma` file. It now includes the `Profile` model and its 1:1 relation to `User`:

```prisma
model Post {
  author    User?
  content   String?
  id        Int     @id
  published Boolean @default(false)
  title     String
}

model User {
  email   String   @unique
  id      Int      @id
  name    String?
  post    Post[]
  profile Profile?
}

model Profile {
  bio  String?
  id   Int     @id
  user User
}
```

### 3. Generate Prisma Client

With the updated Prisma schema, you can now also update the Prisma Client API with the following command:

```
npx prisma generate
```

This command updated the Prisma Client API in `node_modules/@prisma/client`.

### 4. Use the updated Prisma Client in your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement a new route in the REST API, e.g. `/api/profile`.

Here are some examples for some Prisma Client operations:

#### Create a new profile for an existing user

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

#### Create a new user with a new profile

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

#### Update the profile of an existing user

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

### 5. Build new UI features in React

Once you have added a new endpoint to the API (e.g. `/api/profile` with `/POST`, `/PUT` and `GET` operations), you can start building a new UI component in React. It could e.g. be called `profile.tsx` and would be located in the `pages` directory.

In the application code, you can access the new endpoint via `fetch` operations and populate the UI with the data you receive from the API calls.

## Next steps

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Prisma Client API](https://github.com/prisma/prisma2/tree/master/docs/prisma-client-js/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track Prisma 2's progress on [`isprisma2ready.com`](https://isprisma2ready.com)
