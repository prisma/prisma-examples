# REST API Example with Express & Prisma Postgres

This example shows how to implement a **REST API with TypeScript** using [Express](https://expressjs.com/), Prisma ORM and a [Prisma Postgres](https://www.prisma.io/postgres) database.

## Getting started

### 1. Download example and navigate into the project directory

Download this example:

```terminal
npx try-prisma@latest --template orm/express --install npm --name express
```

Then, navigate into the project directory:

```terminal
cd express
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```terminal
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```terminal
cd prisma-examples/orm/express
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

prisma+postgres://accelerate.prisma-data.net/?api_key=ey...

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

### 3. Start the REST API server

Start the development server:

```terminal
npm run dev
```

The server is now running on `http://localhost:3000`. You can now run the API requests, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

## Using the REST API

### Testing with `curl`

You can run these `curl` commands to test all API endpoints:

#### `GET`

##### Fetch a single post by its ID

```sh
curl -X GET http://localhost:3000/post/1
```

##### Fetch all published posts (with optional query parameters)

```sh
curl -X GET "http://localhost:3000/feed?searchString=prisma&take=2&orderBy=desc"
```

##### Fetch a user's drafts by their ID

```sh
curl -X GET http://localhost:3000/user/3/drafts
```

##### Fetch all users

```sh
curl -X GET http://localhost:3000/users
```

#### `POST`

##### Create a new post
```sh
curl -X POST http://localhost:3000/post \
     -H "Content-Type: application/json" \
     -d '{
           "title": "My New Post",
           "content": "This is an example post.",
           "authorEmail": "mahmoud@prisma.io"
         }'
```

##### Create a new user

```sh
curl -X POST http://localhost:3000/signup \
     -H "Content-Type: application/json" \
     -d '{
           "email": "ankur@prisma.io",
           "name": "Ankur Datta",
           "postData": [
             {
               "title": "Hello World",
               "content": "This is the content of the post"
             }
           ]
         }'
```

#### `PUT`

##### Toggle the publish status of a post

```sh
curl -X PUT http://localhost:3000/publish/4
```

##### Increase the view count of a post

```sh
curl -X PUT http://localhost:3000/post/2/views
```

#### `DELETE`

##### Delete a post by its ID

```sh
curl -X DELETE http://localhost:3000/post/1
```

### API endpoints

<details><summary>Expand to see all API endpoints</summary>

### `GET`

- `/post/:id`: Fetch a single post by its `id`
- `/feed?searchString={searchString}&take={take}&skip={skip}&orderBy={orderBy}`: Fetch all _published_ posts
  - Query Parameters
    - `searchString` (optional): This filters posts by `title` or `content`
    - `take` (optional): This specifies how many objects should be returned in the list
    - `skip` (optional): This specifies how many of the returned objects in the list should be skipped
    - `orderBy` (optional): The sort order for posts in either ascending or descending order. The value can either `asc` or `desc`
- `/user/:id/drafts`: Fetch user's drafts by their `id`
- `/users`: Fetch all users

### `POST`

- `/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/signup`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user
    - `postData: PostCreateInput[]` (optional): The posts of the user

### `PUT`

- `/publish/:id`: Toggle the publish value of a post by its `id`
- `/post/:id/views`: Increases the `viewCount` of a `Post` by one `id`

### `DELETE`

- `/post/:id`: Delete a post by its `id`

</details>

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

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

```terminal
npx prisma migrate dev --name add-profile
```

This adds another migration to the `prisma/migrations` directory and creates the new `Profile` table in the database.

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Those operations can be used to implement API endpoints in the REST API.

#### 2.1 Add the API endpoint to your app

Update your `index.ts` file by adding a new endpoint to your API:

```ts
app.post('/user/:id/profile', async (req, res) => {
  const { id } = req.params
  const { bio } = req.body

  const profile = await prisma.profile.create({
    data: {
      bio,
      user: {
        connect: {
          id: Number(id)
        }
      }
    }
  })

  res.json(profile)
})
```

#### 2.2 Testing out your new endpoint

Restart your application server and test out your new endpoint.

##### `POST`

- `/user/:id/profile`: Create a new profile based on the user id
  - Body:
    - `bio: String` : The bio of the user


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

## Switch to another database (e.g. SQLite, MySQL, SQL Server, MongoDB)

If you want to try this example with another database than Postgres, you can adjust the the database connection in [`prisma/schema.prisma`](./prisma/schema.prisma) by reconfiguring the `datasource` block.

Learn more about the different connection configurations in the [docs](https://www.prisma.io/docs/reference/database-reference/connection-urls).

<details><summary>Expand for an overview of example configurations with different databases</summary>

### Remove the Prisma Client extension

Before you proceed to use your own database, you should remove the Prisma client extension required for Prisma Postgres:

```terminal
npm uninstall @prisma/extension-accelerate
```

Remove the client extension from your `PrismaClient` instance:

```diff
- const prisma = new PrismaClient().$extends(withAccelerate())
+ const prisma = new PrismaClient()
```

### Your own PostgreSQL database

To use your own PostgreSQL database remove the `@prisma/extension-accelerate` package and remove the Prisma Client extension.

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
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
