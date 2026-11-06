# debug-deploy-failures

Diagnose Compute failures from the error code first, then the symptom.

## Priority

HIGH

## Why It Matters

Most failures carry a structured code and a `nextActions` list that names the fix. Guessing from the message, or retrying commands from the removed CLI, wastes the user's time and can deploy into the wrong place.

## First Checks

```bash
npx prisma --version
npx prisma auth whoami --json
npx prisma project show --json
ls module.ts prisma.config.ts
node --version
test -f .env && sed 's/=.*/=<redacted>/' .env
```

Re-run the failing command with `--json` (and `--report deploy-report.json` for `deploy`) and read `error.code`, `error.why`, and `nextActions`. Never print token or connection-string values.

## CLI and Setup

| Symptom | Cause | Fix |
|---------|-------|-----|
| `CLI.UNKNOWN_COMMAND` for `app`, `build`, `database`, `agent`, `destroy`, `compute` | The command was removed | Use the replacement in the SKILL.md table |
| `Unknown command "auth"` or `"deploy"`, or `prisma dev` starts a database server | A Prisma 6 or 7 `prisma` binary | Install `prisma` 8.x as a dev dependency, or use `npx @prisma/cli@latest` |
| `ERR_UNKNOWN_FILE_EXTENSION` | Node.js too old to load `module.ts`. Composer supports 22.18 or newer on the 22 line, 24.11 or newer on the 24 line, or 26 or newer | Upgrade Node.js |
| `CLI.CONFIG_UNREADABLE` with a module error from `effect` | Another `effect` version hoisted over the one `@prisma/composer` pins | Match the app's `effect` to `@prisma/composer`'s `dependencies.effect`, or force it with `overrides` (npm), `pnpm.overrides` or `pnpm-workspace.yaml` `overrides` (pnpm), `resolutions` (Yarn); reinstall |
| `CLI.CONFIG_SECTION_INVALID` with `CONFIG.SECTION_MISSING` | No `composer` section in `prisma.config.ts` | Add the section ([`app-composer-setup.md`](app-composer-setup.md)) |
| `CONFIG.FILE_RETIRED` or `CONFIG.FIELD_RETIRED` | A `prisma-composer.config.ts` or `configPath` from an older Composer | Move `extensions` and `state` into the `composer` section and delete the old file |
| `ASSEMBLE.EXTENSION_MISSING` | A service uses `nextjs()` but `nextjsBuild()` is not in `extensions` | Add `nextjsBuild()` from `@prisma/composer/nextjs/control` |
| `COMPOSE.GRAPH_INVALID` naming an id | A provision id or service name with a hyphen or other non-alphanumeric character | Use `[A-Za-z0-9]` only; at least three characters for provision ids |
| Bun APIs fail while the CLI loads `module.ts` | The `prisma` bin runs under Node | `bun node_modules/.bin/prisma deploy module.ts` |

## Auth and Project

| Symptom | Cause | Fix |
|---------|-------|-----|
| `CLI.CREDENTIALS_REQUIRED` | No session and no service token | Ask the user to run `npx prisma auth login`; in CI set `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID` |
| Error about a blank `PRISMA_SERVICE_TOKEN` | The variable is set but empty | Unset it or provide a token |
| Commands act in the wrong workspace | Another stored session is current, or a service token overrides it | `auth workspace list --json`, then `auth workspace use <id>`; unset `PRISMA_SERVICE_TOKEN` to use sessions |
| `PROJECT.SETUP_REQUIRED` after a successful deploy | `deploy` does not link the directory | `npx prisma project link <app-name>` or pass `--project` |
| `project "<name>" does not exist yet and no deploy region is configured` | First deploy without a region | `prismaCloud({ region })` or `PRISMA_REGION` |
| Deploy refuses an existing project name (`HostedStateBootstrapError`, or `a project with this name already exists`) | A project with the module's name exists that this module did not create | `deploy --name <unique-name>`, or rename the module |
| Deploy fails immediately naming another holder | Another deploy of the same environment holds the state lease | Wait for it; a crashed deploy's lease expires after about a minute |

## Deploy Pipeline

| Symptom | Cause | Fix |
|---------|-------|-----|
| `ASSEMBLE.BUILD_FAILED` | The built entry or directory is missing or invalid (no build, wrong path, symlinks in a `dir` build) | Run the build and check that `entry`/`dir` match its output, relative to `service.ts` |
| `ASSEMBLE.SERVICE_MISSING` | The module provisions no service | Provision at least one `compute()` service |
| `DEPLOY.STAGE_INVALID` | The stage is not a valid Git ref name | Rename the stage |
| A connection input "declares param ..., but its producer ... did not supply it" | An authored connection or extension does not supply a declared value | Fix the producer's outputs; mark the param optional only if absent is valid |
| Deploy fails early naming a missing variable | An `envParam`/`envSecret` name is unset on the stage and in the shell | Export it in the deploying shell or set it with `project env add` |
| `MIGRATION_PATH_NOT_FOUND` | A `postgres(contract)` schema change has no committed migration | `prisma contract emit`, `prisma migration plan --name <slug>`, commit `migrations/` |
| `DEPLOY.ENGINE_FAILED` | The deploy engine or the platform rejected the generated stack | Read the engine lines in the error; it names `.prisma-composer/alchemy.run.ts` and a command that reproduces the failure |
| `DEPLOY.BUILD_REQUIRED` from `destroy` | `destroy` packages the built app too | Build, then destroy |

## Deployed but Not Working

| Symptom | Cause | Fix |
|---------|-------|-----|
| Public URL times out or returns 502 at once | Listener on `localhost`, wrong port, or a crash at boot | Bind `0.0.0.0` on `service.port()`; read `npx prisma service logs <service>` |
| `Cannot find package`, `Cannot find module`, or `ENOENT while resolving package` in logs | The build left a package as an import, and the default `dependencies: "bundled"` ships only the build output | Bundle every dependency (`bun build --target=bun`), or set `dependencies: "external"` on `node()` so the deploy stages the installed packages |
| 502s in a loop after the app was idle | A database client dies when idle connections close | Small reconnect-friendly pool; log `uncaughtException` and `unhandledRejection` instead of exiting |
| `504 Gateway Time-out` with an `openresty` body after about 60 seconds | The handler sent nothing for 60 seconds | Respond first, continue under `waitUntil`, or queue the work |
| Background work stops or never finishes | The instance slept | `waitUntil` or `KeepAwakeGuard` from `@prisma/compute`; persist progress |
| `401` from a deployed `/rpc/<method>` | Composer's service-key check; only wired consumers may call | Test through a consumer or locally; not a deploy failure |
| `RUNTIME.TEMPORAL_UNAVAILABLE` or a failure on the first timestamp read | No global `Temporal` on the runtime | Import a Temporal polyfill at the server entry, or use string column types |
| Next.js page shows build-time or missing values from `service.load()` | The route was prerendered | `export const dynamic = "force-dynamic"` |
| `ECONNRESET` calling another service | The callee was cold-starting | Retry |
| A changed env var has no effect | Values resolve at deploy time | Redeploy (or promote) |
| A resource disappeared after a deploy | Its `provision()` was removed from `module.ts` | Restore the declaration and redeploy |
| A preview's database is empty | Stages get their own empty databases | Seed it; production data is never copied |

## Deploy on Push

| Symptom | Cause | Fix |
|---------|-------|-----|
| Push builds nothing, no error | No workflow on the pushed branch | Add `.github/workflows/prisma-deploy.yml` ([`deploy-on-push.md`](deploy-on-push.md)) |
| Green run with `skipped-no-credential` | Repository not connected, no `id-token: write`, or a fork | `npx prisma git connect`, add the permission |
| `CLI.UNKNOWN_COMMAND` inside the action | Action release v1.5.0 or older | Use `prisma/cloud-deploy-action@v1` (v1.9.0 or later) |
| Install step fails on pnpm or Yarn | The action auto-detects npm and Bun only | Set `install-command` |

## Custom Domains

`npx prisma service domain show <hostname> --service <service> --json` prints the state and the DNS record it expects. `SERVICE.DOMAIN_DNS_NOT_CONFIGURED` means the CNAME is not visible yet; create it, then run `add` again. After fixing DNS on a `failed` domain, run `service domain retry`. `SERVICE.BRANCH_NOT_DEPLOYABLE` means a preview branch was targeted; domains are production only.

## Local Development

- `dev` lists services from other apps: the emulators are shared machine-wide daemons. Ignore names not in your `module.ts`.
- `dev --fresh` fails for an app with a database in this release. Follow the reset steps in [Local development](https://www.prisma.io/docs/composer/local-development#whats-local-vs-whats-real).
- Windows is not supported for the local stack.

## Report CLI Bugs

When a failure survives these checks or the CLI reports an internal error, send it to the CLI team without secrets:

```bash
npx prisma feedback "deploy failed with DEPLOY.UNEXPECTED: <first error line>"
```

## Bad

Retrying `bunx @prisma/cli@latest app deploy --prod --yes` after `CLI.UNKNOWN_COMMAND`, or editing code before reading `error.code`.

## Good

Re-run with `--json --report deploy-report.json`, read `error.code` or `failure.code`, apply the fix this table names, rebuild, and deploy again.

## References

- [Deploying](https://www.prisma.io/docs/composer/deploying)
- [Request timeout](https://www.prisma.io/docs/compute/request-timeout)
- [CLI error reference](https://www.prisma.io/docs/cli/error-reference)
