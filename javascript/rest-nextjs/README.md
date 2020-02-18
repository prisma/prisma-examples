# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app** using [Express.JS](https://expressjs.com/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md). It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/javascript/rest-nextjs
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

### 2. Start the app

```
npm run dev
```

