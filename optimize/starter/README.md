# Prisma Optimize starter example

This example shows the basics of Prisma Optimize in a Todo app. It uses a SQLite database file with some initial dummy data which you can find at [`./prisma/dev.db`](./prisma/dev.db).

## Getting started

### 1. Download example and install dependencies

Download this example:

```
npx try-prisma@latest --template optimize/starter
```

Install npm dependencies:

```
cd starter
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/optimize/optimize_starter
npm install
```

</details>

### 2. Create the database

Run `npm run build` from project root to create your SQLite database.

### 3. Log in to Optimize

Login and create an API key (also called a token) [in the Optimize dashboard](https://console.prisma.io/optimize).

Navigate to `packages/server` and add a `.env` file that matches the `.env.example` file.

```sh
cd packages/server
cp .env.example .env
```

Copy your API key (also called token) to the `PRISMA_OPTIMIZE_TOKEN`.

```sh
PRISMA_OPTIMIZE_TOKEN="<your_token_here>"
```

### 4. Run the app

1. Got to recordings [in the Optimize dashboard](https://console.prisma.io/optimize) and click the "Start recording" button.
1. Run `npm start` from the project root.
1. Open the demo app @ http://localhost:5173 in the browser. Perform a bunch of actions - add a Todo, mark a Todo as complete, delete a Todo, etc.
1. Go back to the Optimize dashboard and click the "Stop recording" button.
1. Enjoy some sweet queries, groups, and most importantly recommendations with our friendly AI chat.

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
