Hey there!

Welcome to Yet Another Todo App: Optimize Edition!

To get started, follow these steps:

1. Run `npm i` from project root.
1. Login and create yourself an API key (also called token) [in the Optimize dashboard](https://optimize.prisma.io).
1. Navigate to `packages/server` and add a `.env` file that matches the `.env.example` file.
   ```sh
   cd packages/server
   cp .env.example .env
   ```
1. Copy your API key (also called token) to the `PRISMA_OPTIMIZE_TOKEN`.

   ```
   PRISMA_OPTIMIZE_TOKEN="<your_token_here>"
   ```

1. Run `npm run build` from project root to create your SQLite database.
1. Go back to recordings [in the Optimize dashboard](https://optimize.prisma.io) and click the "Start recording" button.
1. Run `npm start` from project root.
1. Open the demo app @ http://localhost:5174 in the browser. Perform a bunch of actions - add a Todo, mark a Todo as complete, delete a Todo, etc.
1. Go back to the Optimize dashboard and click the "Stop recording" button.
1. Enjoy some sweet queries, groups, and most importantly recommendations with our friendly AI chat.
