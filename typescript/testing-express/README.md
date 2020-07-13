# Testing Express

This example shows how to implement integration tests using [Express](https://expressjs.com/), [Supertest](https://github.com/visionmedia/supertest) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md). It is based on a SQLite database, you can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/testing-express
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the REST API server

Rename the `.env.example` to `.env` and execute this command to start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in `index.js`, e.g. [`http://localhost:3000/feed`](http://localhost:3000/feed).

### 3. Testing the endpoints

The tests are located in the `tests` folder. In these you will find tests handled for cases if a same user is added twice and also to check if the users added are obtained correctly.

The tests can be run using:

```
npm test
```

## Using the REST API

You can access the REST API of the server using the following endpoints:

### `GET`

- `/user`: Fetch all users

### `POST`

- `/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

