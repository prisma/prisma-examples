# Fullstack Example with SvelteKit Actions, Load Functions & Prisma Postgres

This example shows how to implement a **fullstack app in TypeScript with [SvelteKit](https://kit.svelte.dev/)** using SvelteKit's [actions](https://kit.svelte.dev/docs/form-actions) and [load](https://kit.svelte.dev/docs/form-actions#loading-data) functions and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client). It uses a [Prisma Postgres](https://www.prisma.io/postgres) database.

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template orm/sveltekit  --install npm --name sveltekit
```

Then, navigate into the project directory:

```
cd sveltekit
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/orm/sveltekit
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

### 3. Start the app

```
npm run dev
```

The app is now running, navigate to [`http://localhost:5173/`](http://localhost:5173/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./src/routes/+page.svelte`](./src/routes/+page.svelte))

![home page](https://user-images.githubusercontent.com/49971500/214607585-2b21d5ea-7810-4f58-b866-f58f267e48a2.png)

**Signup** (located in [`./src/routes/signup/+page.svelte`](./src/routes/signup/+page.svelte))

![Sign up page](https://user-images.githubusercontent.com/49971500/214607832-be532abb-c28a-496c-b5b9-54295ab40edf.png)

**Create post (draft)** (located in [`./src/routes/create/+page.svelte`](./src/routes/create/+page.svelte))

![Create Post page](https://user-images.githubusercontent.com/49971500/214608388-022b23c6-05c5-4892-9839-a9e8c2de37c7.png)

**Drafts** (located in [`./src/routes/drafts/+page.svelte`](./src/routes/drafts/+page.svelte))

![View Draft[(https://user-images.githubusercontent.com/49971500/214608068-8a8b2b12-f47b-434f-b668-14fdd1df9edd.png)

**View post** (located in [`./src/routes/p/[id]/+page.svelte`](./src/routes/p/[id]/+page.svelte)) (delete or publish here)

![View Post](https://user-images.githubusercontent.com/49971500/214607411-9b470fa3-bc88-4b14-86e6-9ec18fd2e3dd.png)

</details>

## Using the SvelteKit Actions and Load functions

The `load` functions interact with the server to get data into your pages while the `actions` function mutates your data. Both these functions are defined in the `+page.server.ts` in the respective route folders.

### `LOAD`
- `/`: Fetch all *published* posts
- `/drafts`: Fetch all *drafted* posts
- `/p/:id`: Fetch a *single* post by its `id`

### `ACTIONS`
- `/create`: Create a new post
    - `default` action body:
        - `title: String` (required): The title of the post
        - `content: String` (required): The content of the post
        - `authorEmail: String` (required): The email post's author
- `/p/:id`:
    - `publishPost` action: Publish a post by its `id`
    - `deletePost` action: Delete a post by its `id`
- `/signup`: Create a new user
    - `default` action body:
        - `email: String` (required): The email address of the user
        - `name: String` (required): The name of the user

## Evolving the app

Evolving the application typically requires three steps:

1. Migrate your database using Prisma Migrate
1. Update your server-side application code
1. Build new UI features in Svelte

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


### 3. Build new UI features in Svelte

Once you have added a new route to your app (e.g. `/profile/+page.server.ts` with respective load and action operations), you can start building a new UI component in Svelte. It could e.g. be called `/profile/+page.svelte` and would be located in the `src/routes` directory.

In the application code, you can manipulate data using `actions` and populate the UI with the data you receive from the `load` function.

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
