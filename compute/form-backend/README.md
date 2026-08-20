# Form Backend

A self-hostable form endpoint. Deploy it once, create a form in the dashboard,
then point any static site's `<form action="...">` at the endpoint it gives you.
Submissions land in your database, browsable and exportable as CSV.

No JavaScript required on the sending page. No third party sees your form data.

Built with [Hono](https://hono.dev), [Prisma Next](https://www.prisma.io), and
[Prisma Composer](https://www.prisma.io) on Prisma Compute + Prisma Postgres.

## Features

- **One endpoint per form** — `POST /f/:slug`, accepting `application/json`,
  `application/x-www-form-urlencoded`, and `multipart/form-data` (text fields).
- **Works without JS** — plain HTML posts get a `303` to your redirect URL, or a
  built-in thank-you page.
- **Open CORS on `/f/*` only** — browser `fetch()` from any origin works; the
  dashboard stays same-origin.
- **Built-in honeypot** — a non-empty `_gotcha` field looks successful and
  stores nothing.
- **Server-rendered dashboard** — list forms with submission counts, create,
  pause, and delete them; browse submissions 25 at a time; delete individual
  entries.
- **CSV export** — union of every field name across a form's submissions, with
  spreadsheet formula injection defused.
- **Privacy by default** — no IP address, no user agent. Just the submitted
  fields, the `Referer`, and a timestamp.
- **Small footprint** — one embedded stylesheet, no client framework, no CSS
  framework, no CSV library.

## Quickstart

```bash
bun install
ADMIN_PASSWORD=choose-a-password bun run dev:composer
```

That builds the app and brings the whole stack up locally — a Prisma Postgres
instance, migrations, and the service — then prints the local URL. Open it and
you'll find a seeded `contact` form with three demo submissions, so the
dashboard and the CSV export have something to show immediately.

The dashboard lives at `/admin`. Sign in with the password you exported.

> `bun run dev:composer` captures `ADMIN_PASSWORD` from your shell on the first
> run and remembers it in `.prisma-composer/dev/`. To change it later, run
> `bunx prisma@next composer dev module.ts --fresh` (this also wipes local data).
> Tail the running app with `bunx prisma@next composer log module.ts`.

<details>
<summary>Troubleshooting: <code>A Prisma Dev server with the name "pcdev-form-backend-database" is already running</code></summary>

The local emulators (`compute-main.mjs` / `postgres-main.mjs` on ports 4300 and
4301) are shared across every Composer project on your machine. If one of them
was killed uncleanly, it can leave a stale lock behind. Stop the emulator
processes, remove the stale registry entry, and rerun:

```bash
pkill -f "composer-prisma-cloud/dist/(compute|postgres)-main.mjs"
rm -rf "$HOME/Library/Application Support/prisma-dev-nodejs/pcdev-form-backend-database/"{.lock,server.json}
ADMIN_PASSWORD=choose-a-password bun run dev:composer
```

(On Linux the registry lives under `~/.local/share/prisma-dev-nodejs/` instead.)
The database's data directory (`.pglite`) is left in place.
</details>

### Without Composer

If you'd rather point the app at a PostgreSQL database you already have
(15 or newer):

```bash
cp .env.example .env   # fill in DATABASE_URL and ADMIN_PASSWORD
bun run db:init        # create the tables from src/prisma/contract.prisma
bun run dev            # http://localhost:3000
```

## Usage

Every form gets an endpoint at `/f/<slug>`. Copy-paste this into any static
page — GitHub Pages, a Jekyll site, a plain `index.html`:

```html
<form action="https://your-deployment.example/f/contact" method="POST">
  <label>Name <input type="text" name="name" required></label>
  <label>Email <input type="email" name="email" required></label>
  <label>Message <textarea name="message" required></textarea></label>

  <!-- Honeypot: humans never see it, bots fill it in. -->
  <input type="text" name="_gotcha" tabindex="-1" autocomplete="off"
         style="position:absolute;left:-9999px" aria-hidden="true">

  <button type="submit">Send</button>
</form>
```

After a successful post the visitor is sent to the form's **redirect URL** with
a `303` if you configured one, and otherwise sees a small built-in
"Thanks — submission received" page.

To stay on your own page, post JSON instead:

```js
const response = await fetch("https://your-deployment.example/f/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Ada",
    email: "ada@example.com",
    message: "Hello!",
    _gotcha: "", // keep the honeypot; leave it empty
  }),
});

const result = await response.json(); // { ok: true }
```

A request is treated as JSON when its `Content-Type` is `application/json`, or
when it sends `Accept: application/json`. Everything else gets the redirect or
the HTML page.

### Endpoint behavior

| Situation | Response |
| --- | --- |
| Success, JSON request | `200` `{ "ok": true }` |
| Success, form post with a redirect URL | `303` to that URL |
| Success, form post without one | `200` thank-you page |
| `_gotcha` non-empty | Success response, **nothing stored** |
| Unknown slug | `404` |
| Form paused | `410` |
| Body over 50 KB | `413` |
| Multipart containing a file part | `415` |
| Any other content type | `415` |
| `OPTIONS` preflight | `204` with permissive CORS headers |

Field names beginning with `_` are control fields and are never stored, so
`_gotcha`, `_subject`, and friends stay out of your data.

## Configuration

| Variable | Required | Purpose |
| --- | --- | --- |
| `ADMIN_PASSWORD` | For the dashboard | Password for `/admin`. **There is no default** — with nothing set, the dashboard shows a "disabled" notice and refuses every login, while `/f/:slug` keeps collecting. |
| `DATABASE_URL` | Only for `bun run dev` | Direct (non-Composer) mode. `dev:composer` and deploys get their database from Composer. |

`ADMIN_PASSWORD` is declared as a secret on the service (`service.ts`) and
bound from the environment in `module.ts`:

```ts
// service.ts
input: type({ adminPassword: secretString() })

// module.ts
input: { adminPassword: envSecret("ADMIN_PASSWORD") }
```

The session cookie is an HMAC-SHA256 of a fixed subject keyed by that password,
compared in constant time — so rotating the password invalidates every session.

## Deploy

Deploys go to Prisma Compute + Prisma Postgres. Export a service token, a
workspace, and the admin password, then:

```bash
export PRISMA_SERVICE_TOKEN=...
export PRISMA_WORKSPACE_ID=...
export ADMIN_PASSWORD=choose-a-strong-password

bun run deploy
```

`bun run deploy` builds the esbuild bundle and runs
`prisma-composer deploy module.ts`, which provisions the database, applies
migrations, and starts the service. The deploy prints the public URL — that
origin plus `/f/<slug>` is what your `<form action>` points at.

Deploy an isolated environment with a stage, and tear it down the same way:

```bash
bunx prisma@next composer deploy module.ts --stage preview
bunx prisma@next composer destroy module.ts --stage preview
```

## Project structure

```
module.ts                    Composer app: database + service, ADMIN_PASSWORD binding
service.ts                   Service declaration: deps, input schema, build
prisma.config.ts             Prisma Next CLI config
prisma-composer.config.ts    Deploy config (Prisma Cloud target)
src/
  index.ts                   Boot: binds 0.0.0.0 on service.port()
  app.tsx                    Route mounting, 404 and error pages
  auth.ts                    Admin password resolution + HMAC session cookie
  csv.ts                     Hand-rolled CSV writer with formula-injection defusing
  origin.ts                  Public origin behind a proxy
  payload.ts                 Body parsing, size cap, honeypot, control-field stripping
  ui.tsx                     Layout + the one embedded stylesheet
  routes/
    home.tsx                 GET /  — public landing page
    collect.tsx              POST /f/:slug — the collection endpoint (+ CORS)
    admin.tsx                /admin — login, forms, submissions, CSV export
  prisma/
    contract.prisma          Data contract: Form, Submission
    contract.json            Generated — do not edit
    contract.d.ts            Generated — do not edit
    db.ts                    Client wiring (Composer binding, or DATABASE_URL)
    forms.ts                 All database access
    seed.ts                  Demo form + submissions, only on an empty database
```

After editing `src/prisma/contract.prisma`:

```bash
bun run contract:emit
```

Never hand-edit `contract.json` or `contract.d.ts`.

## Limitations

This is deliberately small. Known gaps, all of them good first issues:

- **No rate limiting.** A public endpoint with no throttle is spammable beyond
  what the honeypot catches. Per-IP or per-form limits would be the natural
  next step (without storing the IP).
- **No email or webhook notifications.** Submissions only appear in the
  dashboard; nothing pings you.
- **No file uploads.** Multipart requests carrying a file part are rejected
  with a `415`.
- **Single admin password.** No user accounts, no roles, no 2FA. The session
  cookie is `SameSite=Lax`, which blocks cross-site form posts, but there is no
  per-request CSRF token.
- **No search or filtering** over submissions — just newest-first pagination
  and the CSV export.
- **No spam scoring** beyond the honeypot.
