# cli-command-map

The Prisma 8 CLI commands an agent uses to deploy and operate a Compute app, with the flags, output, and targeting rules that matter.

## Priority

CRITICAL

## Why It Matters

Agents trained on the earlier Compute CLI reach for `@prisma/cli app deploy`, `build logs`, and `database ...`, which no longer exist. The current CLI also refuses to guess: it needs explicit targets, exact consent tokens for destructive actions, and the Prisma 8 binary.

Verified with `prisma` 8.0.0-rc.21 and `@prisma/cli` 8.0.0-rc.21 (same commands; the `@prisma/cli` binary is named `prisma-cli`).

## Which Binary Runs

| Situation | Run |
|-----------|-----|
| Composer app with `prisma` 8.x in `devDependencies` | `npx prisma <command>` (or `bunx prisma`, `pnpm exec prisma`) |
| No local `prisma`, or a Prisma 6/7 project | `npx @prisma/cli@latest <command>` |

A Prisma 6 or 7 `prisma` binary has no `auth`, `project`, `service`, `branch`, `git`, or `deploy` commands. In Prisma 7, `dev` starts a local Prisma Postgres server and `postgres` only links an existing database. `npx prisma --version` prints the version; in a non-terminal it prints a JSON envelope with `result.version`.

## Commands

| Command | Subcommands and flags | Notes |
|---------|-----------------------|-------|
| `auth` | `login`, `logout`, `whoami`, `workspace list`, `workspace use [id-or-name]`, `workspace logout <id-or-name>` | `login` opens a browser. `logout` ends every stored session |
| `project` | `list`, `show [id-or-name]`, `create <name> [--region]`, `link [id-or-name]`, `rename <name>`, `delete <id-or-name>`, `transfer <id-or-name>` | `create` and `link` write `.prisma/local.json` and gitignore it |
| `project env` | `add [KEY=VALUE\|KEY]`, `update`, `list`, `delete <key>`; scope with `--role production\|preview` or `--branch <git-name>`; `--file <dotenv>` for `add`/`update` | Values are write-only |
| `postgres` | `list`, `show`, `create <name> [--region] [--branch]`, `usage`, `delete`, `backup list\|restore`, `connection list\|create\|rotate\|delete` | Connection URLs print once |
| `bucket` | `list`, `create [--name] [--branch]`, `delete <bucket-id>`, `key list\|create\|delete` | Keys print once |
| `branch` | `list` | No create or delete |
| `git` | `connect [git-url]`, `disconnect` | `connect` needs an interactive terminal |
| `service` | `list`, `create <name> [--region] [--branch]`, `show <service>`, `open <service>`, `logs <service>`, `delete <service>` | `--project`, `--branch` on each |
| `service version` | `list <service>`, `show <id>`, `promote <id>`, `rollback <service> [--to <id>]`, `start <id>`, `stop <id>`, `delete <id>` | Version ids look like `cpv_...` |
| `service domain` | `add`, `show`, `wait [--timeout]`, `retry`, `delete`, each `<hostname> --service <service>` | Production branch only |
| `deploy <entry>` | `--name`, `--stage`, `--report <path>`, `--build-id <id>` | Composer app; does not build |
| `dev <entry>` | `--name`, `--fresh` | Composer app, local, no credentials |
| `init` | `--skills <agents>`, `--postinstall/--no-postinstall` | Local only; never edits an existing `prisma.config.ts` |
| `skills` | `sync [--disable\|--enable]`, `list` | Copies package-shipped skills |
| `feedback <message>` | `--email <address>` | Anonymous unless `--email` |

`contract`, `db`, `migration`, `orm`, `lsp`, and `telemetry` belong to Prisma ORM and the CLI itself; they are outside this skill. There is no `destroy`, `log`, `app`, `build`, `database`, `agent`, or `compute` command.

## Global Flags

Every command accepts these:

- `--json` (same as `--format json`), or `--format human|json|markdown`
- `--interactive` / `--no-interactive`
- `--yes`: accept prompt defaults; it cannot grant consent
- `--confirm <token>`: grant one consent prompt; repeat for several
- `--config <path>`: read another config file instead of `./prisma.config.ts`
- `--log-level error|warn|info|verbose`, `-v`, `-q`, `--color/--no-color`

When stdout is not a terminal the CLI already writes JSON; pass `--json` anyway so the intent is explicit. When `CI` is set (and not `false`), prompts are off.

## JSON Output

Each command prints one envelope:

```json
{"kind":"result","envelope":{"ok":false,"commandId":"","error":{"code":"CLI.UNKNOWN_COMMAND","summary":"No command registered for `app`","nextActions":[{"kind":"run-command","command":"prisma --help"}]},"nextActions":[]}}
```

On success, `envelope.ok` is `true` and `envelope.result` holds the data. On failure, branch on `envelope.error.code`; codes are a stable contract and messages are not. Codes you will meet:

| Code | Meaning |
|------|---------|
| `CLI.UNKNOWN_COMMAND` | The command does not exist in this CLI version |
| `CLI.INVALID_ARGUMENTS` | Unknown flag or bad argument |
| `CLI.CONSENT_REQUIRED` | A destructive action needs `--confirm <token>` |
| `CLI.INTERACTION_REQUIRED` | The command needs an interactive terminal (`git connect`, `auth login`) |
| `CLI.CREDENTIALS_REQUIRED` | No stored session and no `PRISMA_SERVICE_TOKEN` |
| `PROJECT.SETUP_REQUIRED` | No `--project` and no `.prisma/local.json` link |
| `SERVICE.TARGET_REQUIRED` | The service argument is missing |
| `SERVICE.NO_PREVIOUS_VERSION` | `rollback` without `--to` found nothing to roll back to |
| `CLI.CONFIG_UNREADABLE` | `prisma.config.ts` failed to evaluate (often an `effect` version conflict) |

`deploy --json` also emits step events and ends with `envelope.result.summary.nodes[].entities[]`, where each entity has `kind` (`compute-service`, `postgres-database`), `id`, and, for services, `url`.

## Targeting

- **Project:** `--project <id-or-name>`, else the `.prisma/local.json` link, else `PROJECT.SETUP_REQUIRED`. Only `project create` and `project link` write the link; `deploy` does not.
- **Branch:** `--branch <git-name>`. Without it, commands target the project's default branch, which is production. The current Git branch is not consulted.
- **Service:** the first positional argument. There is no picker and no environment fallback.
- **Version:** version ids are globally unique, so `service version show|promote|start|stop|delete <id>` need no other scope.

Environment variables the CLI reads for the Platform: `PRISMA_SERVICE_TOKEN` (overrides stored sessions; a set-but-empty value is an error), `PRISMA_WORKSPACE_ID` (the workspace for a service token), `PRISMA_REGION` (region for a project the first deploy creates), and `PRISMA_COMPOSER_REPORT_FILE` (same as `--report`). `PRISMA_SKILLS_CHECK=0` silences the out-of-date skills notice. It does not read `PRISMA_PROJECT_ID`, `PRISMA_APP_ID`, or `PRISMA_SERVICE_ID`.

## Consent Tokens

These commands stop at a consent prompt. In a non-interactive run, pass the token with `--confirm`; `--yes` fails with `CLI.CONSENT_REQUIRED`.

| Command | Token |
|---------|-------|
| `project delete <project>` | Project id |
| `project transfer <project>` | Project id |
| `postgres delete <database>` | Database id |
| `postgres backup restore <database> --backup <id>` | Target database id |
| `postgres connection rotate <connection-id>` | Connection id |
| `postgres connection delete <connection-id>` | Connection id |
| `bucket delete <bucket-id>` | Bucket id |
| `service delete <service>` | Service name |
| `service version delete <version-id>` | Version id |
| `service version rollback <service> --to <version-id>` | Target version id |
| `service domain delete <hostname>` | Hostname |

```bash
npx prisma service version rollback api --project my-app --to cpv_123 --confirm cpv_123 --json
```

Run a consent-gated command only when the user asked for that specific action.

## Bad

```bash
bunx @prisma/cli@latest app deploy --prod --yes --env .env
npx prisma service delete api --yes
```

`app deploy` fails with `CLI.UNKNOWN_COMMAND`, and `--yes` cannot answer the consent prompt for `service delete`.

## Good

```bash
npm run build
npx prisma deploy module.ts --stage feat-search --json
npx prisma service delete api --branch feat-search --confirm api --json
```

## References

- [CLI reference](https://www.prisma.io/docs/cli)
- [Global flags](https://www.prisma.io/docs/cli/global-flags)
- [Error reference](https://www.prisma.io/docs/cli/error-reference)
