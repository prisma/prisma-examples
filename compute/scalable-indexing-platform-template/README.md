# DevShelf 📚

> A searchable resource directory: full-text search, filters and cursor pagination over a catalog that stays fast from 20 rows to more than a million.

DevShelf indexes open-source learning resources (tutorials, project templates, architecture blueprints) and lets people search and browse them. Use it as the starting point for any directory: a docs index, a job board, a product catalog, a link library.

It is built end to end on the Prisma platform:

- **[Prisma ORM](https://www.prisma.io/orm)** 8 for typed queries, migrations and bulk inserts.
- **[Prisma Postgres](https://www.prisma.io/postgres)** for the data, with a full-text search index and keyset pagination.
- **[Prisma Compute](https://www.prisma.io/compute)** to host it, declared with Prisma Composer.
- **[Next.js](https://nextjs.org/)** 16 (App Router), Tailwind CSS v4 and shadcn/ui for the interface.

<a href="https://console.prisma.io/apps/scalable-indexing-platform-template"><img src="https://www.prisma.io/docs/img/deploy-button.svg" alt="Deploy with Prisma" width="172" height="36" /></a>

Live example: [shelf.anasi.me](https://shelf.anasi.me/), the original DevShelf this template is based on.

---

## ✨ Features

- **Full-text search:** searches titles and descriptions with a PostgreSQL full-text index. Words match as prefixes, so typing `kuber` finds "Kubernetes". A `#tag` query (or a click on a tag chip) searches the tags instead.
- **Filters:** by category (`Web Dev`, `Machine Learning`, `DevOps`, `Cybersecurity`, `Cloud Computing`, `Mobile Dev`) and by difficulty (`Beginner`, `Intermediate`, `Advanced`). Filters combine with search.
- **Cursor pagination:** Next, Previous and First buttons page through any result with a keyset cursor. A page costs the same whether it is the first or the fifty-thousandth, and rows are never skipped or repeated.
- **Bulk seeding:** one command adds 100,000 generated resources (or any number you ask for) in batches, so you can see how the app behaves at scale.
- **Adaptive workbench (grid and list):**
  - **Grid view:** cards with category badges, two-line summaries and difficulty ratings.
  - **Compact list view:** a dense table for rapid scanning with inline authors, stars, tags and links.
- **Keyboard ergonomics:** press `/` to focus the search bar, `Esc` to clear it.
- **Theme preference:** dark, light and system themes with `next-themes`, without a flash of unstyled content.
- **SEO and structured data:** semantic HTML, a strict heading hierarchy, Open Graph and Twitter metadata, and JSON-LD (`WebSite` with `SearchAction`, `DataCatalog`, `ItemList`).
- **App Router states:** `loading.tsx` skeletons, an `error.tsx` boundary with retry, and a custom `not-found.tsx`.

The catalog is ordered by id, which is what makes the cursor exact. There is no sort control yet; see [Make it yours](#-make-it-yours) for how to add one.

---

## 🚀 Getting started

You need **Node.js 22.18 or newer** (`.nvmrc` selects Node 24 for `nvm use`) and **[Bun](https://bun.sh)**, the package manager this template is locked with and the runtime Prisma Compute uses.

### 1. Install

```bash
bun install
```

### 2. Create a database

Any PostgreSQL 15+ database works. For a free Prisma Postgres database, with no account needed:

```bash
bunx create-db@latest
```

It prints a connection string. Copy `.env.example` to `.env.local` and paste it in:

```bash
cp .env.example .env.local     # then set DATABASE_URL
```

Use `.env.local`, not `.env`: `next build` copies `.env` into the bundle that a deploy uploads.

### 3. Create the tables

```bash
bun run db:migrate
```

This applies the migration in `migrations/`: the `User` and `Resource` tables, the indexes for the filters, and the search indexes.

### 4. Start the app

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000). An empty database gets the 20 curated sample resources on the first visit, so there is something to search right away. `bun run db:seed` writes the same sample from the command line and is safe to run again.

### 5. Try it at scale (optional)

```bash
bun run db:seed:bulk              # add 100,000 generated resources
bun run db:seed:bulk 1000000      # or any number, up to 5,000,000
bun run db:seed:bulk --reset      # delete the generated resources again
```

Rows are generated and inserted 2,000 at a time with the ORM's multi-row insert, so memory stays flat. 100,000 rows take about half a minute against a Prisma Postgres database; a million take about four minutes and about 700 MB of storage, so check your plan's storage first. Generated rows have ids of the form `bulk-000000001`: they never collide with your own data, a second run continues where the first one stopped, and `--reset` removes only them.

### Without a database of your own

```bash
bun run composer:dev
```

This runs the app with Prisma Composer against a local Prisma Postgres database that gets the committed migrations, with no connection string and no account. It runs in the foreground (stop it with Ctrl+C) and works on macOS and Linux.

---

## ☁️ Deploy to Prisma Compute

The **Deploy with Prisma** button above copies this template to your GitHub account and deploys the copy with its own Prisma Postgres database.

To deploy from your machine instead:

```bash
bunx prisma auth login          # once; opens the browser
bun run build
bun run composer:deploy
```

A deploy creates the Prisma project (named after the module in `module.ts`) if it does not exist, provisions a Prisma Postgres database, applies the migrations in `migrations/`, deploys the app and prints its URL. The first visit seeds the sample catalog. Later deploys apply only what changed.

To deploy on every push, connect the repository once with `bunx prisma git connect`. The included workflow (`.github/workflows/prisma-deploy.yml`) then deploys the default branch to production and every other branch to a preview with its own database; deleting a branch removes its preview.

- **Region:** the first deploy creates the project in `us-east-1`. To use another region, change `prismaCloud({ region })` in `prisma.config.ts` **before** the first deploy; it cannot change later.
- **Environment variables:** none are needed on Prisma Compute. The app gets its database from Composer (`service.load()` in `src/prisma/db.ts`). `DATABASE_URL` is only for local development and the seed scripts.

---

## 🔎 How search and pagination work

The query lives in one file, `src/lib/resources.ts`.

- **One stable order.** Every list is ordered by `id`, the primary key. A cursor is the id of the last (or first) row on the page, and the next page is `id > cursor`. Because the order is total, a page boundary cannot skip or repeat a row, and going back returns exactly the page you came from.
- **Filters seek, they do not scan.** Browsing with a category or difficulty filter uses a composite index (`category, id`, `difficulty, id` or `category, difficulty, id`), so the database jumps straight to the cursor.
- **Search uses an index.** `@@fullTextIndex([title, description])` in the contract creates a GIN index over a weighted search document, and the query matches against the same document, so PostgreSQL can always use it. Tags have their own GIN index.
- **Rare terms stay fast.** A search first asks the search index for up to 1,000 matching ids beyond the cursor. If there are fewer, those are all the matches and they are sorted directly. If there are more, the term is common and paging in id order finds a full page after a short scan. Either way a query that matches nothing returns in milliseconds instead of reading the whole table.
- **The record count** comes from PostgreSQL's planner statistics once the table is large, and from an exact count while it is small.

Measured on Prisma Postgres with 1,000,000 rows, in database time: a filtered page deep in the catalog takes about 10 ms, a search with few or no matches 5 to 30 ms, and a page of a term that matches a tenth of the table 100 to 250 ms. The slowest case is a common term combined with a category it never appears in, at about a second.

---

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router with React Server Components) |
| **Database** | Prisma Postgres, queried with Prisma ORM 8 |
| **Hosting** | Prisma Compute, declared with Prisma Composer |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/turbopack`) |
| **Component system** | shadcn/ui backed by `@base-ui/react` |
| **Icons** | `lucide-react` |
| **Theme** | `next-themes` |
| **Typography** | Plus Jakarta Sans and JetBrains Mono |

---

## 📁 Project structure

```text
module.ts                    the Composer app: a Prisma Postgres database and the Next.js service
service.ts                   the service: the Next.js build and its database dependency
prisma.config.ts             Prisma ORM (contract, connection) and Composer (region, build) config
migrations/                  planned migrations, applied by every deploy
src/
  prisma/
    contract.prisma          the schema: User, Resource, and the indexes
    contract.json, .d.ts     generated from it by `bun run contract:emit`
    db.ts                    the Prisma ORM client (Composer's on Compute, DATABASE_URL elsewhere)
    seed.ts, seed-cli.ts     the curated sample catalog
    seed-bulk.ts             batched bulk ingestion
  lib/
    resources.ts             the catalog query: filters, search, cursor pagination, count
    data.ts                  the 20 curated sample resources
    types.ts                 Resource, Category, Difficulty
  app/
    layout.tsx               fonts, metadata, theme and tooltip providers
    page.tsx                 reads the URL (search, filters, cursor) and renders the catalog
    loading.tsx, error.tsx, not-found.tsx
  components/
    ui/                      shadcn/ui components
    common/                  navbar, footer, pagination, theme toggle, structured data
    features/resources/      dashboard, search section, grid, card, list item, newsletter
```

---

## 📜 Scripts

| Script | What it does |
| --- | --- |
| `bun run dev` | Next.js dev server against `DATABASE_URL`. |
| `bun run build` | Production build (standalone output, which Prisma Compute runs). |
| `bun run lint`, `bun run typecheck` | ESLint and TypeScript. |
| `bun run db:migrate` | Applies the committed migrations to `DATABASE_URL`. |
| `bun run db:seed` | Writes the curated sample. Safe to run again. |
| `bun run db:seed:bulk [count]` | Adds generated resources in batches. `--reset` deletes them. |
| `bun run contract:emit` | Regenerates `src/prisma/contract.json` and `contract.d.ts` after a change to `contract.prisma`. |
| `bun run migration:plan --name <name>` | Writes a migration for the change. |
| `bun run composer:dev` | Runs the app locally with Prisma Composer and a local database. |
| `bun run composer:deploy` | Deploys the built app to Prisma Compute. |

---

## 🧩 Make it yours

- **Your data:** edit the sample in `src/lib/data.ts`, or insert rows into `Resource` with any PostgreSQL client. The categories and difficulties are plain text columns; the lists the interface offers are in `src/lib/types.ts` and `src/lib/resources.ts`.
- **A new field:** add it to `src/prisma/contract.prisma`, then run `bun run contract:emit`, `bun run migration:plan --name <name>` and `bun run db:migrate`. The next deploy applies the migration.
- **A sort control:** to sort by stars or date, order by that column and then by `id` (`.orderBy([(r) => r.stars.desc(), (r) => r.id.asc()])`), pass both values in the cursor, and add an index on the same columns. Keeping `id` as the last sort key is what keeps pagination exact.
- **Your branding:** the name, metadata and JSON-LD in `src/app/layout.tsx` and `src/components/common/structured-data.tsx` describe DevShelf. Set `NEXT_PUBLIC_SITE_URL` to your own address, or edit them.
- **The newsletter form** in `src/components/features/resources/newsletter-section.tsx` is a placeholder: it validates the address and shows a confirmation, but stores nothing. Connect it to your email provider or remove it.
- **Sign-in:** there is none. The app only reads the catalog, so nothing needs protecting until you add a way to submit resources.

---

## ⌨️ Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `/` | Focus the search input from anywhere on the page |
| `Esc` | Clear the search query and blur the input |

---

## 👤 Author

Built with craft by **Anas Ibn Belal**.

- Website: [shelf.anasi.me](https://shelf.anasi.me)
- GitHub: [anas20023](https://github.com/anas20023)
- LinkedIn: [anasibelal004](https://www.linkedin.com/in/anasibelal004/)
- Facebook: [anasib2000004](https://www.facebook.com/anasib2000004)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
