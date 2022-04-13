# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/)** using [React](https://reactjs.org/) (frontend), [Express](https://expressjs.com/) and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) (backend). It uses a SQLite database file with some initial dummy data which you can find at [`./backend/prisma/dev.db`](./backend/prisma/dev.db).

## Getting Started

### 1. Download example and install dependencies

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/typescript/rest-nextjs-express
```

Navigate to the example:

```
cd rest-nextjs-express
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Navigate to the example:

```
cd prisma-examples/typescript/rest-nextjs-express
```

</details>

#### Install npm dependencies: 

Install dependencies for your [`backend`](./backend). Open a terminal window and install the `backend`'s dependencies

```bash
cd backend
npm install
```

Open a separate terminal window and navigate to your [`frontend`](./frontend) directory and install its dependencies

```bash
cd frontend
npm install
```

### 2. Create and seed the database (backend)

On the terminal window used to install the backend npm dependencies, run the following command to create your SQLite database file. This also creates the `User` and `Post` tables that are defined in [`prisma/schema.prisma`](./backend/prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./backend/prisma/seed.ts) will be executed and your database will be populated with the sample data.

### 3. Start the server (backend)

On the same terminal used in step 2, run the following command to start the server:

```bash
npm run dev
```

The server is now running at [`http://localhost:3001/`](http://localhost:3001/).

### 4. Start the app (frontend)

On the terminal window used to install frontend npm dependencies, run the following command to start the app:

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx))

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

You can also access the REST API of the API server directly. It is running [`localhost:3001`](http://localhost:3001) (so you can e.g. reach the API with [`localhost:3000/feed`](http://localhost:3001/feed)).

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


__INLINE(../_evolving-the-app-rest-nextjs.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__