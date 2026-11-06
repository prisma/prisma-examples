# automation-create-prisma

`create-prisma` scaffolds a new Prisma 8 project that is already a Composer app, and can deploy it once.

## Priority

MEDIUM

## Why It Matters

`create-prisma` writes a working Composer app in one command, but only for new projects, and its `--json` mode deploys by default. Older versions generated `prisma.compute.ts` and a `compute:deploy` script; current versions generate `module.ts`, `service.ts`, and a `composer` section instead.

Verified with `create-prisma` 0.14.1.

## Commands

```bash
npx create-prisma@latest --help
```

| Flag | Meaning |
|------|---------|
| `[project-name]`, `--name` | Project directory and root module name |
| `--template` | `minimal`, `hono`, `elysia`, `nest`, `next`, `turborepo`, `svelte`, `astro`, `nuxt`, `tanstack-start` |
| `--provider` | `postgres` or `mongo` |
| `--authoring` | `psl` or `typescript` for the data contract |
| `--package-manager` | `npm`, `pnpm`, `yarn`, `bun`, `deno` |
| `--deploy` | Build and deploy after scaffolding |
| `--workspace` | Workspace id or name to deploy into |
| `--skills` | Agents to install package skills for (`claude,cursor,agents,devin`), or `none` |
| `--yes` | Accept defaults; does not deploy |
| `--json` | One JSON result, non-interactive; deploys unless `--no-deploy` |

When to deploy:

| Invocation | Deploys |
|------------|---------|
| `--deploy` | Yes |
| `--json` without `--no-deploy` | Yes |
| `--yes` without `--deploy` or `--json` | No |
| Interactive | Asks |
| `--package-manager deno` | Never; no Composer files are generated |

For an unattended scaffold with no deploy, pass both:

```bash
npx create-prisma@latest my-api --template hono --provider postgres --yes --json --no-deploy
```

## What It Generates

- `module.ts` provisioning one service named `app`. With `--provider postgres`, it also provisions `postgres({ name: "database", contract, config: "./prisma.config.ts" })` from `@prisma/composer-prisma-cloud/orm`, so the deploy applies the generated migrations. With `--provider mongo`, it binds `envSecret("MONGODB_URL")` to the service input.
- `service.ts` with the build adapter for the template; see [`app-framework-builds.md`](app-framework-builds.md).
- `prisma.config.ts` with `orm`, `skills`, and `composer` sections. The `composer` section uses `prismaCloud({ region: "us-east-1" })`; change the region before the first deploy if the app belongs elsewhere.
- Scripts: `composer:dev` (`prisma dev module.ts`), `composer:deploy` (`prisma deploy module.ts`), `dev:composer` (build, then `composer:dev`), and `deploy` (build, then `composer:deploy`). The `deploy` script targets production; pass a stage with `npx prisma deploy module.ts --stage <name>` instead.
- `/.prisma-composer` in `.gitignore`.

## Deploy Flow

With deploy enabled, `create-prisma` runs `prisma auth whoami`, selects the workspace, checks that no project already has the app's name, runs the build script, and runs `prisma deploy module.ts --report <tmp>`. Without a session it signs in interactively in a terminal; in `--json` mode or without a TTY it stops with `not_authenticated`, keeps the scaffold, and tells the user to sign in and run the `deploy` script.

## Rules

- Do not run `create-prisma` inside an existing app to deploy it. Port the app ([`app-composer-setup.md`](app-composer-setup.md)) and use `prisma deploy`.
- Use the scripts the scaffold actually wrote; read `package.json` rather than reconstructing them.
- A scaffold's first deploy is production. Ask the user before using `--deploy` or `--json` without `--no-deploy`.

## Bad

```bash
npx create-prisma@latest my-api --template hono --yes --json
```

This deploys to production without anyone deciding to.

## Good

```bash
npx create-prisma@latest my-api --template hono --provider postgres --yes --json --no-deploy
cd my-api
npm run dev:composer
```

Verify locally, then deploy a stage with `npm run build && npx prisma deploy module.ts --stage preview`.

## References

- [create-prisma on npm](https://www.npmjs.com/package/create-prisma)
- [Deploy your first app](https://www.prisma.io/docs/prisma-compute/deploy)
