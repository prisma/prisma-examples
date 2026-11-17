# AdonisJS + Prisma Postgres

A task manager built with [AdonisJS 7](https://adonisjs.com), backed by [Prisma Postgres](https://www.prisma.io/postgres) and deployed to [Prisma Compute](https://www.prisma.io/compute).

It is a standard AdonisJS app, created from the Hypermedia starter kit: Lucid models and migrations, VineJS validators, Edge templates, and session auth. Prisma Postgres is a regular PostgreSQL database here, so Lucid connects to it with the `pg` driver and a connection string. The app does not use Prisma ORM.

You sign up, add tasks, rename them, mark them as done, and delete them. Each task belongs to the signed-in user and is a row in the database.

## What is in the box

| Path                                          | What it does                                                                            |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| `app/controllers/tasks_controller.ts`         | Create, read, update, and delete for tasks, scoped to the signed-in user                |
| `app/models/task.ts`, `app/models/user.ts`    | Lucid models and the `user.tasks` relationship                                          |
| `app/validators/task.ts`                      | VineJS validation for the task forms                                                    |
| `database/migrations/`                        | Lucid migrations for `users` and `tasks`                                                |
| `config/database.ts`                          | The `pg` connection, read from `DATABASE_URL`                                           |
| `resources/views/pages/tasks/`                | Edge templates for the task list and the rename form                                    |
| `service.ts`, `module.ts`, `prisma.config.ts` | What Prisma Compute deploys: the server and its database                                |
| `bin/compute.ts`                              | Entry point on Prisma Compute: sets the environment, runs migrations, starts the server |

## Run locally

You need Node.js 24 or newer and [Bun](https://bun.sh), which this template uses as its package manager.

```bash
bun install
cp .env.example .env
node ace generate:key
```

Create a Prisma Postgres database for development. This command needs no account, and it writes `DATABASE_URL` to `.env`. Remove the placeholder `DATABASE_URL` line that `.env.example` left there, so the new value is the only one.

```bash
npx create-db@latest --env .env
```

The database is deleted after 24 hours unless you claim it with the link the command prints. To use a database you already have, set `DATABASE_URL` in `.env` to its connection string.

Apply the migrations and start the dev server:

```bash
node ace migration:run
bun run dev
```

Open [http://localhost:3333](http://localhost:3333), create an account, and add a task.

## Deploy to Prisma Compute

A deploy creates a Prisma Postgres database for the app, generates its `APP_KEY`, and starts the server. You set no environment variables. When the server starts, `bin/compute.ts` applies pending Lucid migrations before it accepts requests.

### From your machine

```bash
bun run compute:login
bun run compute:deploy
```

The first deploy creates a project named `adonisjs-prisma-postgres` in the `us-east-1` region and prints the app's URL. To use another name, change it in `module.ts`. To use another region, change `prismaCloud({ region })` in `prisma.config.ts` before the first deploy, because a project keeps its region.

### On every push

Connect the GitHub repository to the project once:

```bash
npx prisma project link adonisjs-prisma-postgres
bun run compute:connect
```

From then on, `.github/workflows/prisma-deploy.yml` deploys every push. The default branch deploys to production. Every other branch deploys to its own preview with its own empty database, and deleting the branch removes the preview.

### Useful commands

```bash
bun run compute:open                                # open the live app
npx prisma service logs adonisjs-prisma-postgres.web # read the server logs
```

## How the deployment works

- **Build.** `bun run build` runs `node ace build`, bundles `bin/compute.ts` into `build/bin/compute.js`, and installs production dependencies into `build/`. Prisma Compute runs that folder as it is.
- **Database.** `module.ts` declares the database with `rawPostgres()`, so the deploy creates it and hands its connection string to the service. `bin/compute.ts` copies that into `DATABASE_URL`, which `config/database.ts` reads, the same as on your machine.
- **Migrations.** Prisma Compute does not run Lucid migrations during a deploy. `bin/compute.ts` runs `node ace migration:run --force` each time an instance starts. Lucid takes a database lock while it migrates, and a start with nothing to migrate adds about a second.
- **Secrets.** `APP_KEY` is generated on the platform, once for each environment, with `generatedParam()`. It is never in the repository or on your machine.
- **Runtime.** Prisma Compute runs the app on Bun. The app uses no Bun APIs, so it runs the same on Node.js locally.

## Learn more

- [Deploy an AdonisJS app with Prisma Postgres and Prisma Compute](https://www.prisma.io/docs/guides/compute/adonisjs): the guide that builds this app step by step
- [Prisma Compute documentation](https://www.prisma.io/docs/compute)
- [Prisma Postgres documentation](https://www.prisma.io/docs/postgres)
- [AdonisJS documentation](https://docs.adonisjs.com)
