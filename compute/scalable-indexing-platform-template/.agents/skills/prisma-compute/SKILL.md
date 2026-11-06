---
name: prisma-compute
description: Deploy and operate apps on Prisma Compute with the Prisma 8 CLI. Use whenever the user mentions Prisma Compute, deploying or hosting a Prisma app, `prisma deploy`, `prisma dev module.ts`, Prisma Composer apps (`module.ts`, `compute()`, the `composer` section of `prisma.config.ts`), preview stages, deploy on push (`prisma git connect`, `prisma/cloud-deploy-action`), `prisma service` logs, versions, rollback, or custom domains, `project env`, `PRISMA_SERVICE_TOKEN`, regions, 504s, sleeping instances, or `waitUntil`; also when a project still uses the removed `@prisma/cli app deploy`, `prisma.compute.ts`, `defineComputeConfig`, `compute:deploy`, or `build logs` surface.
license: MIT
metadata:
  author: prisma
  version: "2.0.0"
---

# Prisma Compute

Deploy TypeScript apps to Prisma Compute and operate them afterwards. Every deploy goes through a Prisma Composer app (a `module.ts` root module) and the Prisma 8 CLI, `prisma`.

Verified against `prisma` 8.0.0-rc.21 (published identically as `@prisma/cli`), `@prisma/composer` and `@prisma/composer-prisma-cloud` 0.28.0, `@prisma/compute` 0.1.0-beta.0, and `create-prisma` 0.14.1. Re-checked against `prisma` 8.0.0-rc.23, whose command surface matches rc.21, and Composer 0.30.0, which adds `node()`'s `dependencies` option (0.29.0) and narrows the supported Node.js versions. The CLI moves fast: run `npx prisma <group> --help` before using a flag this skill does not show.

## Version-Matched Skills

The installed packages ship their own agent skills, matched to the installed version:

- `prisma-platform-core-concepts`, inside `prisma`: projects, branches, services, versions, env vars, deploy on push.
- `prisma-composer-core-concepts`, inside `@prisma/composer`: declaring services, modules, databases, and builds; `dev`, `deploy`, and teardown.

`npx prisma skills sync` copies them into the agent skill directories (`.claude/skills`, `.cursor/skills`, `.agents/skills`, `.devin/skills`), and `npx prisma skills list` shows what is installed. `npx prisma init` does the same and adds a `postinstall` hook that keeps them current. When those skills are installed, use them for API details. This skill covers the deploy and operations workflow and its pitfalls.

## Removed Surface

The Compute CLI from before Composer is gone. Its commands fail with `CLI.UNKNOWN_COMMAND` (removed flags with `CLI.INVALID_ARGUMENTS`), its config files are not read, and its environment variables are ignored:

| Removed | Use instead |
|---------|-------------|
| `@prisma/cli app deploy`, `app build`, `app run` | Your own build script, then `npx prisma deploy module.ts`; `npx prisma dev module.ts` to run locally |
| `prisma.compute.ts`, `prisma.compute.json`, `defineComputeConfig` | `module.ts`, a `service.ts` per server declared with `compute()`, and the `composer` section of `prisma.config.ts` |
| `init` writing a compute config | `npx prisma init` now writes a `prisma.config.ts` with only a `skills` section, adds `prisma` as a dev dependency, and syncs skills. Add the `composer` section yourself |
| `compute:deploy` script | `npx prisma deploy module.ts`, or the `deploy` script current `create-prisma` generates |
| `app deploy --branch <name>` | `npx prisma deploy module.ts --stage <name>` |
| `app deploy --prod`, `--no-promote`, `app promote` | No `--stage` deploys production; `service version promote <version-id>` |
| `app show`, `app open`, `app list-deploys`, `app show-deploy` | `service show <service>`, `service open <service>`, `service version list <service>`, `service version show <version-id>` |
| `app logs` | `service logs <service>` |
| `app rollback --to <id> --yes` | `service version rollback <service> --to <id> --confirm <id>` |
| `app domain ...` | `service domain ... --service <service>` |
| `app remove` | Remove the `provision()` from `module.ts` and deploy, or `service delete <service> --confirm <service>` |
| `build logs <build-id>` | The GitHub Actions run log or the Console; `GET /v1/builds/{buildId}` for state and failing step |
| `database ...` | `postgres ...` |
| `project env remove` | `project env delete` |
| `auth logout --workspace <id>` | `auth workspace logout <id>` |
| `agent install`, `agent update`, `agent status` | `npx skills add prisma/skills --skill prisma-compute`; `npx prisma skills sync` for package skills |
| `PRISMA_PROJECT_ID`, `PRISMA_APP_ID`, `PRISMA_SERVICE_ID` | `--project <id-or-name>`, the service as a positional argument, and `.prisma/local.json` from `project link` |
| `/v1/apps` REST endpoints | `/v1/services` (the `/v1/apps` paths are deprecated) |

A repository with `prisma.compute.ts` or a `compute:deploy` script was set up for the removed flow. Port it to Composer ([`app-composer-setup.md`](references/app-composer-setup.md)) instead of running the old commands.

## When to Apply

- Deploying a new or existing app to Prisma Compute
- Porting a project that uses `prisma.compute.ts`, `compute:deploy`, or `@prisma/cli app deploy`
- Setting up preview stages, deploy on push, or CI deploys
- Reading service logs, listing versions, promoting, or rolling back
- Managing env vars, custom domains, Prisma Postgres databases, or buckets in a Compute project
- Debugging a failed deploy, an unreachable service, a `504`, or work that stops when an instance sleeps

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | CLI surface | CRITICAL | `cli-` |
| 2 | App declaration | CRITICAL | `app-` |
| 3 | Runtime | CRITICAL | `runtime-` |
| 4 | Deploy | HIGH | `deploy-` |
| 5 | Operations | HIGH | `ops-` |
| 6 | Debugging | HIGH | `debug-` |
| 7 | Automation | MEDIUM | `automation-` |

## Quick Reference

### 1. CLI surface (CRITICAL)

- `cli-prisma-8-binary` - Platform and deploy commands exist only in the Prisma 8 CLI. In a Prisma 6 or 7 project, `npx prisma` runs that version's ORM CLI, which has no `auth`, `project`, `service`, or `deploy`; Prisma 7's `dev` starts a local database instead. Check `npx prisma --version`; outside a Prisma 8 project use `npx @prisma/cli@latest <command>`.
- `cli-help-first` - Command groups are `auth`, `project` (with `project env`), `postgres`, `bucket`, `branch`, `git`, and `service` (with `service version` and `service domain`), plus `deploy`, `dev`, `init`, `skills`, and `feedback`. Read `--help` before using a flag.
- `cli-json` - Pass `--json`, and `--no-interactive` in scripts. Branch on `error.code` (`NAMESPACE.SUBCODE`) and follow `nextActions`; do not parse messages.
- `cli-explicit-targets` - Name the service as the first argument, the project with `--project` (or link the directory), and a preview with `--branch`. Without `--branch` a command targets the production branch; the CLI does not read the current Git branch.
- `cli-consent-tokens` - Destructive commands need `--confirm <token>` with an exact id, name, or hostname. `--yes` cannot grant consent. Run them only when the user asked for that action.

### 2. App declaration (CRITICAL)

- `app-composer-required` - A deployable app has `module.ts` (default export `module(name, ...)`), a `service.ts` per server (`compute({ name, deps, build })`), and a `composer` section in `prisma.config.ts` with `prismaCloud()`, `nodeBuild()` (plus `nextjsBuild()` for Next.js), and `state: prismaState()`.
- `app-build-adapter` - `node({ module: import.meta.url, entry })` for one self-contained bundle, `node({ module, dir, entry })` for a built directory, `nextjs({ module, appDir })` for Next.js standalone. Add `dependencies: "external"` to `node()` when the build leaves packages as imports. See [`app-framework-builds.md`](references/app-framework-builds.md).
- `app-region` - The first deploy creates the project and needs a region: `prismaCloud({ region: "eu-central-1" })` or `PRISMA_REGION`. The region cannot change later.
- `app-databases` - `rawPostgres()` (package root) delivers `{ url }`; `postgres(contract)` from `@prisma/composer-prisma-cloud/orm` adds a typed client and applies committed migrations on deploy. Read both through `service.load()`, not `process.env.DATABASE_URL`.
- `app-names` - Provision ids and service names allow `[A-Za-z0-9]` only, and the platform rejects ids shorter than three characters. The root module name becomes the project name.

### 3. Runtime (CRITICAL)

- `runtime-bind-all-interfaces` - Listen on `service.port()` (also exported as `PORT`, default 3000) and bind `0.0.0.0`. A loopback listener is unreachable.
- `runtime-bun` - Services run on Bun. By default (`dependencies: "bundled"`) a deploy ships only the build output, never the project's `node_modules`, so the build must inline every dependency except runtime built-ins. A build that leaves packages as imports (`tsc`, Astro's Node adapter) sets `dependencies: "external"` on `node()`, and the deploy stages the installed packages its entry imports.
- `runtime-first-byte-60s` - A request that sends no bytes for 60 seconds gets `504 Gateway Time-out` and is cancelled. Respond first, then continue under `waitUntil` or from a queue.
- `runtime-sleep` - Idle instances are snapshotted and resumed. Timers and floating promises can stall. `waitUntil` and `KeepAwakeGuard` from `@prisma/compute` keep an instance awake on a best-effort basis; they do not make work durable.
- `runtime-no-websockets` - WebSocket servers are not supported.

### 4. Deploy (HIGH)

- `deploy-build-first` - `deploy` and `dev` do not build. Run the build, then `npx prisma deploy module.ts`.
- `deploy-dev-first` - `npx prisma dev module.ts` runs the whole app locally with no credentials. Verify each local URL before deploying.
- `deploy-production-intent` - A deploy without `--stage`, and a push to the default branch of a connected repository, change production. Get the user's go-ahead first; use `--stage <name>` for previews.
- `deploy-auth` - On a workstation the user runs `npx prisma auth login` (browser). In CI set `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID`. Check `npx prisma auth whoami --json` (`envelope.result.authenticated`, `envelope.result.workspace`) before deploying.
- `deploy-link-after` - `deploy` finds or creates the project by the root module name (or `--name`) and does not write `.prisma/local.json`. Run `npx prisma project link <app-name>` afterwards, or pass `--project`, before `service`, `git`, or `project env` commands.
- `deploy-on-push` - Deploy on push needs both `npx prisma git connect` (interactive) and a workflow running `prisma/cloud-deploy-action@v1`. Connecting alone deploys nothing.
- `deploy-verify-url` - Take each service URL from the deploy output (`--json` result or `--report <path>`) and request it.

### 5. Operations (HIGH)

- `ops-logs` - `service logs <service>` reads the live version; `--version-id <id>` reads another, `--follow` streams. Build output lives in the CI log or the Console, not the CLI.
- `ops-versions` - `service version promote <version-id>` rebuilds with production env vars. `service version rollback <service> --to <id> --confirm <id>` switches back without a rebuild.
- `ops-env-write-only` - `project env add|update|list|delete` with `--role production`, `--role preview`, or `--branch <name>`. Values are never returned and apply on the next deploy.
- `ops-domains` - `service domain add <hostname> --service <service>`, create the CNAME it reports, then `service domain wait`. Production branch only.
- `ops-secrets-once` - `postgres create`, `postgres connection create|rotate`, and `bucket key create` print credentials once. Store them; never echo them.

### 6. Debugging (HIGH)

- `debug-error-code-first` - Read `error.code` and `nextActions` from `--json` output, or `failure.code` from the `--report` file, before changing anything.
- `debug-public-url` - Test the printed public URL, not `localhost`. A deploy that converged but does not answer is usually host binding, the port, or a crash at boot; read `service logs`.
- `debug-report-cli-bugs` - Report unresolvable CLI failures with `npx prisma feedback "<message>"` without secrets.

### 7. Automation (MEDIUM)

- `automation-create-prisma` - `create-prisma` scaffolds a new Prisma 8 project that is already a Composer app. Its `--json` mode deploys unless `--no-deploy` is passed.
- `automation-control-api` - `@prisma/composer/control` exposes `deploy`, `destroy`, `dev`, and `log`. Teardown of a stage is `destroy`; it reads only `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID`.
- `automation-rest-api` - Use `/v1/services`, `/v1/deployments/{deploymentId}/logs`, and `/v1/builds` from `https://api.prisma.io/v1/doc`. Do not build new deploy tooling on `@prisma/compute-sdk`.

## Preferred Workflow

1. Inspect `package.json` (is `prisma` 8.x a dev dependency, are `@prisma/composer` and `@prisma/composer-prisma-cloud` installed?), `module.ts`, `prisma.config.ts`, the build script, and leftovers from the removed flow (`prisma.compute.ts`, `compute:deploy`).
2. Install what is missing and sync the package skills:
   ```bash
   npm install @prisma/composer @prisma/composer-prisma-cloud
   npm install -D prisma
   npx prisma skills sync
   ```
3. Declare or port the app: [`app-composer-setup.md`](references/app-composer-setup.md) and [`app-framework-builds.md`](references/app-framework-builds.md).
4. Build, run `npx prisma dev module.ts`, and request each local URL it prints.
5. Run `npx prisma auth whoami --json`. If `envelope.result.authenticated` is `false`, ask the user to run `npx prisma auth login`.
6. Deploy a preview with `npm run build && npx prisma deploy module.ts --stage <name> --json`, or production without `--stage` once the user confirms. A new project needs a region.
7. Request each printed URL, then `npx prisma project link <app-name>` and `npx prisma service list --json` (add `--branch <stage>` for a preview).
8. Report the app name, stage, service ids, URLs, and database ids. Never report secret values.

## Avoid

- Do not run `@prisma/cli app ...`, `build logs`, or `database ...`, and do not create `prisma.compute.ts`.
- Do not run platform commands through a Prisma 6 or 7 `prisma` binary.
- Do not read the port or connection strings from `process.env` in a Composer service.
- Do not expect `deploy` to build, to migrate a `rawPostgres()` database, or to copy production data into a stage.
- Do not pass `--yes` to destructive commands; it cannot grant consent.
- Do not run `auth login` or `git connect` non-interactively; both need a person at a browser.
- Do not push to the default branch of a connected repository without the user's go-ahead; it deploys production.

## References

- [`cli-command-map.md`](references/cli-command-map.md): every verified command, global flags, JSON envelope, targeting, consent tokens
- [`app-composer-setup.md`](references/app-composer-setup.md): the minimum declaration, region, databases, config and secrets, porting from `prisma.compute.ts`
- [`app-framework-builds.md`](references/app-framework-builds.md): build output and `build:` adapter per framework
- [`runtime-requirements.md`](references/runtime-requirements.md): Bun, host and port, 60-second first byte, sleep, keep-awake, regions
- [`deploy-cli-and-ci.md`](references/deploy-cli-and-ci.md): `prisma deploy`, stages, credentials, output, CI, teardown
- [`deploy-on-push.md`](references/deploy-on-push.md): GitHub connection and the `prisma/cloud-deploy-action` workflow
- [`ops-services-and-config.md`](references/ops-services-and-config.md): services, versions, logs, domains, env vars, databases, buckets
- [`debug-deploy-failures.md`](references/debug-deploy-failures.md): symptoms, causes, and fixes
- [`automation-create-prisma.md`](references/automation-create-prisma.md): scaffolding a new Composer app
- [`automation-rest-api.md`](references/automation-rest-api.md): REST API paths, the control API, and the status of `@prisma/compute-sdk`

Docs: [Compute](https://www.prisma.io/docs/compute), [Deploy your first app](https://www.prisma.io/docs/prisma-compute/deploy), [Composer](https://www.prisma.io/docs/composer), [CLI reference](https://www.prisma.io/docs/cli).

## Feedback

`npx prisma feedback "<message>"` sends anonymous feedback to the CLI team with the CLI version, Node.js version, and OS platform. Add `--email <address>` for a reply. Never include tokens, connection URLs, or user data.
