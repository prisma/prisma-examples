# Next.js + tRPC + Prisma Todo App

A simple, clean todo application showcasing the integration of Next.js App Router, tRPC, and Prisma.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **tRPC 11** - End-to-end typesafe APIs
- **Prisma** - Database ORM
- **React Query** - Data fetching and caching
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

## Project Structure

```
src/
├── app/
│   ├── api/trpc/[trpc]/route.ts  # tRPC API handler
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home page
│   └── todos/page.tsx             # Todo list page
├── components/
│   └── providers.tsx              # React Query & tRPC providers
├── lib/
│   ├── db/
│   │   └── index.ts              # Prisma client
│   └── trpc/
│       ├── context.ts            # tRPC context
│       ├── index.ts              # tRPC initialization
│       └── routers/
│           ├── index.ts          # Main router
│           └── todo.ts           # Todo routes
└── utils/
    └── trpc.ts                   # tRPC React client

prisma/
├── schema.prisma                 # Prisma schema
└── generated/                    # Generated Prisma client
```

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Set Up Database

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

Now, paste the URL into it as a value for the `DATABASE_URL` environment variable. For example:

```bash
# .env
DATABASE_URL=prisma+postgres://accelerate.prisma-data.net/?api_key=ey...
```

### 3. Initialize Database

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push
```

### 4. Run Development Server

```bash
bun run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema changes to database
- `bun run db:studio` - Open Prisma Studio
- `bun run db:migrate` - Create database migration

## How It Works

### tRPC Setup

The tRPC setup follows the official Next.js App Router pattern:

1. **Server-side** (`src/lib/trpc/`):
   - `index.ts` - Initializes tRPC with context
   - `routers/` - Defines API endpoints
   - `context.ts` - Creates request context

2. **Client-side** (`src/utils/trpc.ts`):
   - Creates tRPC React client using `@trpc/react-query`

3. **API Route** (`src/app/api/trpc/[trpc]/route.ts`):
   - Handles HTTP requests to tRPC endpoints

### Making Requests

```tsx
import { trpc } from '@/utils/trpc';

function TodoList() {
  // Query
  const todos = trpc.todo.getAll.useQuery();

  // Mutation
  const createTodo = trpc.todo.create.useMutation({
    onSuccess: () => {
      utils.todo.getAll.invalidate();
    },
  });

  return (
    <div>
      {todos.data?.map(todo => (
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  );
}
```

## Database Schema

The app uses a simple Todo model:

```prisma
model Todo {
  id        Int     @id @default(autoincrement())
  text      String
  completed Boolean @default(false)
}
```

## Learn More

- [tRPC Documentation](https://trpc.io)
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Query Documentation](https://tanstack.com/query)
