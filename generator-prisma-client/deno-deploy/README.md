# Prisma + Deno Deploy Example

This project showcases how to use Prisma ORM with Prisma Postgres in a Deno Deploy application. It implements a simple Task API with full CRUD operations.

## Prerequisites

- [Deno](https://docs.deno.com/runtime/#install-deno) v2.0 or later installed
- A [Prisma Data Platform](https://console.prisma.io/login) account for Prisma Postgres

## Tech Stack

- Deno 2
- Prisma Client with the `prisma-client` generator and Deno runtime
- Prisma Postgres

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/deno-deploy
```

### 2. Install dependencies

```bash
deno install
deno install --allow-scripts
```

### 3. Configure environment variables

Create a `.env` file with your Prisma Postgres connection string:

```bash
cp .env.example .env
```

Then edit `.env` and set your `DATABASE_URL`:

```env
DATABASE_URL="postgresql://user:password@db.prisma.io:5432/database"
```

### 4. Push schema and generate client

```bash
deno task db:push
```

This creates the `Task` table and generates the Prisma Client.

### 5. Start the development server

```bash
deno task dev
```

The API will be available at `http://localhost:8000`.

### 6. Test the API

```bash
# Get API info
curl http://localhost:8000/

# Create a task
curl -X POST http://localhost:8000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Prisma", "description": "Complete the Deno guide"}'

# List all tasks
curl http://localhost:8000/tasks

# Update a task
curl -X PATCH http://localhost:8000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:8000/tasks/1
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API info |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a new task |
| GET | `/tasks/:id` | Get a specific task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

## Deploy to Deno Deploy

1. Push your code to GitHub
2. Go to [dash.deno.com](https://dash.deno.com/) and create a new project
3. Configure the deployment:
   - **Install command**: `deno install`
   - **Build command**: `deno run -A npm:prisma generate`
   - **Entrypoint**: `src/main.ts`
4. Add `DATABASE_URL` environment variable in Settings
5. Deploy!

Or use the Deno Deploy CLI:

```bash
deno install -gArf jsr:@deno/deployctl
deployctl deploy --project=your-project-name --env-file=.env
```

## Resources

- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- [Deploy to Deno Deploy guide](https://www.prisma.io/docs/orm/prisma-client/deployment/edge/deploy-to-deno-deploy)
- [Prisma documentation](https://www.prisma.io/docs)
- [Join our Discord community](https://pris.ly/discord)
