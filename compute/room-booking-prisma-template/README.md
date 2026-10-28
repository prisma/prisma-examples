# Room booking with Resource Scheduler and Prisma

Book meeting rooms on a timeline, and never book the same room twice. A
production-ready starter built end to end on the Prisma platform:

- **[Resource Scheduler](https://www.npmjs.com/package/resource-scheduler)** for the room timeline: drag to book, move and resize, with a red footprint before you drop on a taken slot.
- **[Prisma ORM](https://www.prisma.io/orm)** 8 for typed queries and migrations.
- **[Prisma Postgres](https://www.prisma.io/postgres)** for the data, with a database per deploy, preview and laptop.
- **[Prisma Compute](https://www.prisma.io/compute)** to host it, declared with Prisma Composer.

<a href="https://console.prisma.io/apps/room-booking-prisma-template"><img src="https://www.prisma.io/docs/img/deploy-button.svg" alt="Deploy with Prisma" width="172" height="36" /></a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="docs/screenshot-dark.png" />
  <img src="docs/screenshot-light.png" alt="Six room plates saying which rooms are free right now, above a timeline of the day's bookings colored by floor" width="1440" />
</picture>

<!-- GIF placeholder: a 10-second clip of drag-to-book, a red footprint on a taken slot, and a second tab losing the race. -->

## What it does

- A plate per room, like the sign by a meeting room door, says whether it is free right now and until when. **Book now** takes the current half hour.
- Rooms are rows, half hours from 08:00 to 18:00 are columns, grouped by floor. Each floor has a color, on its plates and its bookings, and every room shows how much of its day is booked.
- Drag across free time and your own booking form opens (`onSlotSelect`). Drag a booking to move it, drag its edge to resize it, click it to cancel it.
- A taken slot, a time outside opening hours, or one that has already started turns red before you drop (`eventOverlap`, `isValidDrop`), so most mistakes never reach the server.
- The server checks again inside a transaction, with the same rules, so two people booking the same slot at the same moment cannot both win. The loser's change rolls back on screen with a message that says what is in the way.
- Times are shown and checked on the office's clock (`Europe/Berlin` by default), whatever zone the visitor or the server is in.
- An empty database gets six demo rooms and a day of bookings on the first visit.

## How double booking is prevented

```text
browser                               server (route handler)                 PostgreSQL
───────                               ──────────────────────                 ──────────
bookingRules() on <ResourceScheduler> zod validation (400)
  red footprint, no request           db.transaction(async (tx) => {
                                        lock the room row    ─────────────▶  SELECT ... FOR NO KEY UPDATE
optimistic update                       read overlapping bookings
  ◀── 201, or 409/422 + message         isPlacementAllowed(..., bookingRules())  (resource-scheduler/headless)
  roll back on error                    insert or update     ─────────────▶  EXCLUDE USING gist (backstop)
                                      })
```

1. **The browser** spreads the shared `bookingRules()` (`src/lib/rules.ts`) onto `<ResourceScheduler>`, so a refused place is red before the drop.
2. **The server** validates the body with the same zod schemas, then runs one transaction that locks the room's row, re-reads its bookings and asks `isPlacementAllowed` from `resource-scheduler/headless` with the same rules. Everyone writing to that room waits for the lock, so check-then-write cannot race (`src/server/bookings.ts`).
3. **Postgres** refuses overlapping bookings of one room on its own, with an exclusion constraint added in the first migration. With the lock in place it never fires; it guards against writes that skip the app.

The tests prove each layer separately, including a race where 25 requests book the same slot at once and exactly one succeeds.

## Run it locally

You need **Node.js 24** (`.nvmrc`, the version this template is tested on; the Prisma CLI itself needs 22.18 or newer) and **[Bun](https://bun.sh)**, because Prisma Compute runs your app on Bun and so does its local emulator.

The local emulator runs on macOS and Linux only: `prisma dev` stops on Windows with `local dev is not supported on Windows yet`. On Windows, run it in WSL or a Linux container, or use [hot reload with your own database](#with-hot-reload-and-your-own-database) below.

```bash
npm install
npm run dev:composer
```

Open <http://localhost:3000>. This builds the app and runs it the way Prisma Compute does: on Bun, against a local Prisma Postgres database that gets the committed migrations, with no connection string and no account. It runs in the foreground; stop it with Ctrl+C.

### With hot reload and your own database

```bash
cp .env.example .env.local     # then set DATABASE_URL
npm run db:migrate             # apply the migrations
npm run dev                    # http://localhost:3000, seeds demo data on first visit
```

No database at hand? `npx create-db@latest` creates a temporary Prisma Postgres database and prints its connection string. Or run PostgreSQL in Docker:

```bash
docker run -d --name rooms-db -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=rooms postgres:17
```

Use `.env.local`, not `.env`: `next build` copies `.env` into the bundle that a deploy uploads.

## Deploy to Prisma Compute

The **Deploy with Prisma** button above copies this repository to your GitHub account and deploys the copy with its own database. If the copy's first `prisma-deploy` run is green but deploys nothing, see [Troubleshooting](#troubleshooting).

To deploy your own clone, connect it to a Prisma project once, then push. The included `prisma-deploy` workflow (`.github/workflows/prisma-deploy.yml`) deploys every push: the default branch to production, any other branch to a preview named after it.

```bash
npx prisma auth login                                  # once; opens the browser
npm run deploy                                         # first deploy: creates the project
npx prisma project link room-booking-prisma-template   # point this folder at that project
npx prisma git connect                                 # connect this repository (its origin remote)
git push                                               # from now on, GitHub Actions deploys
```

`git connect` installs the Prisma GitHub App on the repository if needed, and needs an interactive terminal. Importing the repository in the [Prisma Console](https://console.prisma.io) instead creates the project and connects it in one step.

A deploy creates the Prisma project (named after the module in `module.ts`) if it does not exist, provisions a Prisma Postgres database, applies the migrations in `migrations/`, deploys the app and prints its URL; on GitHub, the URL is in the workflow run's log. The first visit seeds the demo data. Later deploys apply only what changed.

- **Region:** the first deploy creates the project in `us-east-1`. To use another region, change `prismaCloud({ region })` in `prisma.config.ts` **before** the first deploy; it cannot change later.
- **Previews:** push a branch to get an isolated copy with its own empty database; deleting the branch removes it. Without GitHub: `npm run build && npx prisma deploy module.ts --stage my-branch`.
- **Without a push:** `npm run deploy` ships the current checkout to production from your machine.
- **Logs and rollback:** `npx prisma service logs app` or `npx prisma service version rollback app --to <id> --confirm <id>`, from a folder linked with `npx prisma project link room-booking-prisma-template`.

There is no `prisma.compute.ts` or `compute:deploy` script. That was the Prisma Compute setup before Prisma Composer; it was removed in favour of `module.ts`, `service.ts` and the `composer` section of `prisma.config.ts`.

## Environment variables

| Variable | Where | What for |
| --- | --- | --- |
| `DATABASE_URL` | `.env.local`, local only | The database for `npm run dev`, `npm run db:*`. Not used on Prisma Compute, where the app gets its database from Composer (`service.load()`). |
| `TEST_DATABASE_URL` | shell or `.env.local` | A disposable PostgreSQL database for the integration tests. |
| `PRISMA_SERVICE_TOKEN`, `PRISMA_WORKSPACE_ID` | CI secrets only | To run `prisma deploy` in CI without a connected repository: another CI system, or the `prisma-deploy` workflow before the repository is connected (see Troubleshooting). |

**Host and port:** the app needs no settings. Prisma Compute sets `PORT`, and the Next.js standalone server it runs listens on `PORT` and on `HOSTNAME`, which defaults to `0.0.0.0` (all interfaces), as Compute requires. Do not add `HOSTNAME` or `HOST` to the project's environment variables: a server bound to `localhost` deploys fine but cannot be reached.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Next.js dev server against `DATABASE_URL`. |
| `npm run dev:composer` | Builds, then runs the whole app locally the way Prisma Compute does. |
| `npm run deploy` | Builds, then deploys to Prisma Compute. |
| `npm run db:migrate` | Applies the committed migrations to `DATABASE_URL`. |
| `npm run db:seed` | Adds the demo rooms and bookings if there are no rooms. `npm run db:seed -- --reset` deletes everything first. |
| `npm run contract:emit` | Regenerates `src/prisma/contract.json` and `contract.d.ts` after a change to `contract.prisma`. |
| `npm run migration:plan -- --name <name>` | Writes a migration for the change. |
| `npm run db:verify` | Checks the database against the contract. |
| `npm test` | Unit tests; with `TEST_DATABASE_URL` also the PostgreSQL integration tests. |
| `npm run lint`, `npm run typecheck` | ESLint and TypeScript. |

## Project structure

```text
module.ts                    the Composer app: a Prisma Postgres database and the Next.js service
service.ts                   the service: the nextjs build adapter and the database dependency
prisma.config.ts             Prisma ORM (contract, connection) and Composer (region, build) config
next.config.ts               output: "standalone", which Prisma Compute runs
migrations/                  planned migrations, applied by every deploy (init adds the exclusion constraint)
src/
  app/
    page.tsx                 server component: rooms and the day's bookings, seeds an empty database
    board.tsx                client component: <ResourceScheduler>, optimistic updates and rollback
    booking-dialog.tsx       the booking form opened by onSlotSelect
    api/bookings/route.ts    GET (a date range) and POST
    api/bookings/[id]/route.ts  PATCH (move, resize) and DELETE
  lib/                       shared by browser and server
    office.ts                office time zone, opening hours, slot length
    rules.ts                 bookingRules(): the placement rules both sides run
    validation.ts            zod schemas for every request
    api-types.ts, api-client.ts  what crosses the network
  server/
    bookings.ts              the transaction, the room lock and isPlacementAllowed
    http.ts                  error responses: 400, 404, 409, 422
  prisma/
    contract.prisma          the schema: Room, Booking
    db.ts                    the Prisma ORM client (Composer's on Compute, DATABASE_URL elsewhere)
    seed.ts, seed-cli.ts     demo data
tests/                       Vitest: rules, validation, and conflicts against PostgreSQL
```

## Tests

```bash
npm test
```

runs the unit tests (rules, time zones, validation). The integration tests need a real, disposable PostgreSQL database, because they are about what two connections do at the same time (the local `prisma dev` database shares one session between connections, so it cannot show that):

```bash
docker run -d --name rooms-test -p 5433:5432 -e POSTGRES_PASSWORD=postgres postgres:17
TEST_DATABASE_URL="postgresql://postgres:postgres@localhost:5433/postgres" npm test
```

They apply the migrations, then check create, move and cancel, 25 simultaneous bookings of one slot (exactly one wins), a create and a move racing, bookings swapping rooms without deadlocks, the room lock alone (constraint dropped), the constraint alone, and concurrent seeding.

## Make it yours

- **Your office:** set `OFFICE_TIME_ZONE`, `OPEN_HOUR`, `CLOSE_HOUR` and `SLOT_MINUTES` in `src/lib/office.ts`. The grid, the red footprint and the server follow.
- **Your rooms:** edit the demo data in `src/prisma/seed.ts` (then `npm run db:seed -- --reset` locally), or insert rows into `Room` with any PostgreSQL client.
- **A new rule** (a maximum length, a room only some people may book, no weekends): add it to `checkBookingRules` in `src/lib/rules.ts` with a message in `describeViolation`. The browser shows it as a red footprint and the server enforces it. Keep rules independent of the machine's time zone: read times with `utcToZoned(date, OFFICE_TIME_ZONE)`, never `date.getHours()`.
- **A new field** (attendees, a description): add it to `src/prisma/contract.prisma`, run `npm run contract:emit`, `npm run migration:plan -- --name <name>` and `npm run db:migrate`, then add it to `src/lib/validation.ts`, the API types and the dialog. The next deploy applies the migration.
- **Sign-in:** there is none in v1, so anyone who can reach the app can book, move and cancel anything. Add authentication (for example [Auth.js](https://www.prisma.io/docs/guides/authentication/authjs/nextjs) or [Better Auth](https://www.prisma.io/docs/guides/authentication/better-auth/nextjs)), check the user in each route handler under `src/app/api/bookings/`, store the owner on `Booking`, and let people change only their own bookings.
- **Recurring bookings:** Resource Scheduler expands a `recurrence` on an event; store the rule next to the booking and check occurrences with `expandEvents` on the server. See [Recurring events](https://resource-scheduler-docs.vercel.app/guides/recurring-events/).
- **Several offices:** give `Room` a time zone and pass it to the rules and the `timeZone` prop per office.

## Troubleshooting

- **`alchemy: node <version> is not supported (module.registerHooks needs node 22.15+, 23.5+, or 24+)`** from `npm run dev:composer` or `npm run deploy`: switch to Node 24 (`nvm use`, the repository has an `.nvmrc`).
- **`local dev is not supported on Windows yet`** (`DEV.PLATFORM_UNSUPPORTED`) from `npm run dev:composer`: Prisma's local emulator does not run on Windows. Run it in WSL or a Linux container, or use `npm run dev` with a `DATABASE_URL`.
- **The `prisma-deploy` run is green but nothing deployed** (its log shows `skipped-no-credential` and "This repository is not connected to a Prisma workspace"): the repository is not connected to a Prisma project, so the workflow gets no credential. Copies made with the Deploy button currently end up like this. Connect the repository as in [Deploy to Prisma Compute](#deploy-to-prisma-compute) and push again, or deploy with a service token: create one in the Prisma Console, add it and the workspace ID (from the workspace settings) as the Actions secrets `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID`, pass them to the deploy step in `.github/workflows/prisma-deploy.yml`, and push:

  ```yaml
        - uses: prisma/cloud-deploy-action@v1
          with:
            build-command: npm run build
          env:
            PRISMA_SERVICE_TOKEN: ${{ secrets.PRISMA_SERVICE_TOKEN }}
            PRISMA_WORKSPACE_ID: ${{ secrets.PRISMA_WORKSPACE_ID }}
  ```

  The token can deploy anything in the workspace, so keep it in secrets only. Once that deploy has created the project, `npx prisma project link room-booking-prisma-template` and `npx prisma git connect` switch the workflow to deploys without a token; then remove the `env:` lines and the two secrets.
- **The deployed URL answers 504:** `next.config.ts` must keep `output: "standalone"`.
- **`HostedStateBootstrapError` on deploy:** a project with the module's name already exists in your workspace and was created from another checkout. Rename the module in `module.ts`, or deploy with `--name <unique-name>`.
- **The integration tests are skipped:** set `TEST_DATABASE_URL` (see Tests).

## Learn more

- [Resource Scheduler docs](https://resource-scheduler-docs.vercel.app/) and the tutorials this template grew from: [React room booking calendar](https://resource-scheduler-docs.vercel.app/tutorials/react-room-booking-calendar/) and [Room booking app with Next.js and Prisma](https://resource-scheduler-docs.vercel.app/tutorials/react-room-booking-nextjs-prisma/)
- [Prisma Compute](https://www.prisma.io/docs/compute), [Prisma Composer](https://www.prisma.io/docs/composer), [Prisma ORM](https://www.prisma.io/docs/orm), [Prisma Postgres](https://www.prisma.io/docs/postgres)

## License

[MIT](LICENSE)
