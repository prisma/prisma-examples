# ops-services-and-config

Inspect and operate what a deploy created: services, versions, logs, domains, environment variables, databases, and buckets.

## Priority

HIGH

## Why It Matters

Operations commands target explicitly: the service is a positional argument, the project comes from `--project` or the directory link, and the branch defaults to production. An agent that relies on the old `app` commands, on `PRISMA_SERVICE_ID`, or on the current Git branch reads or changes the wrong thing.

Every example below accepts `--project <id-or-name>` and `--json`. Without `--branch`, commands act on the production branch.

## Services

A service is one HTTP app on a branch. Every deploy creates an immutable version; one version serves traffic at a time.

```bash
npx prisma service list --json
npx prisma service list --branch feat-search --json
npx prisma service show api --json
npx prisma service open api
```

`service show` returns the live version and the service URL. `service create` exists but is rarely needed; deploys create services.

## Logs

```bash
npx prisma service logs api --tail 200
npx prisma service logs api --follow
npx prisma service logs api --branch feat-search
npx prisma service logs api --version-id cpv_123 --from-start
```

Logs default to the live version. Use `--version-id` for a failed or stopped version. `SERVICE.LOGS_FAILED` carries the API status; `SERVICE.LOGS_INCOMPLETE` means the page ended early, so rerun. Build output is not here: read the GitHub Actions run, the terminal that ran `deploy`, the `--report` file, or the Console.

## Versions, Promote, Rollback

```bash
npx prisma service version list api --json
npx prisma service version show cpv_123 --json
npx prisma service version promote cpv_123
npx prisma service version rollback api --to cpv_122 --confirm cpv_122
npx prisma service version stop cpv_123
npx prisma service version start cpv_123
npx prisma service version delete cpv_123 --confirm cpv_123
```

- `promote` takes a version from a preview branch to production by rebuilding it with production env vars.
- `rollback` puts production back on an existing version without a rebuild. Without `--to` it picks the version before the live one (`SERVICE.NO_PREVIOUS_VERSION` or `SERVICE.LIVE_VERSION_UNKNOWN` when it cannot), and it asks for consent with the target version id. In a non-interactive run, list versions first and pass `--to <id> --confirm <id>`.
- A later production deploy creates a new version and makes it live, so fix the code before the next deploy after a rollback.

## Custom Domains

Domains attach to a service's production branch only, CNAME-based, up to three per service.

```bash
npx prisma service domain add shop.example.com --service web
npx prisma service domain wait shop.example.com --service web --timeout 15m
npx prisma service domain show shop.example.com --service web --json
npx prisma service domain retry shop.example.com --service web
npx prisma service domain delete shop.example.com --service web --confirm shop.example.com
```

`add` verifies DNS first. If the CNAME is not visible yet, it fails with the record to create (pointing at `switchboard.<region>.prisma.build`); create it and run `add` again. `wait --timeout 0` does one status check. States: `pending_dns`, `provisioning_tls`, `active`, `failed`.

## Environment Variables

Three layers: production values, preview values shared by every preview branch, and per-branch overrides on top of preview. Production values cannot be branch-scoped.

```bash
npx prisma project env list --json
npx prisma project env list --role preview --json
npx prisma project env list --branch feat-search --json
npx prisma project env add STRIPE_KEY --role production        # value read from the shell environment
npx prisma project env add --file .env.preview --role preview
npx prisma project env add API_BASE_URL=https://staging.example.com --branch staging
npx prisma project env update STRIPE_KEY --role production
npx prisma project env delete STRIPE_KEY --role preview
```

- Every write names its scope: `--role production`, `--role preview`, or `--branch <name>`.
- `add` fails when the key exists in that scope; use `update`.
- Values are write-only. `list` shows names and metadata, never values, and nothing pulls them back into a `.env`.
- Values resolve at deploy time. A change applies on the next deploy (or `promote`).
- Keys match `[A-Z_][A-Z0-9_]*`; values are non-empty, up to 8 KB.
- Passing only `KEY` reads the value from the current environment and keeps it out of shell history.
- `COMPOSER_*` variables belong to the deploy and are rewritten on every deploy. Do not edit them.

## Databases and Buckets

A Composer app gets its databases and buckets from its module. These commands inspect them or create standalone ones.

```bash
npx prisma postgres list --json
npx prisma postgres list --branch feat-search --json
npx prisma postgres show db_123 --json
npx prisma postgres usage db_123 --json
npx prisma postgres connection create db_123 --name ci
npx prisma postgres connection rotate conn_123 --confirm conn_123
npx prisma postgres backup list db_123 --json
npx prisma bucket list --json
npx prisma bucket key create bkt_123 --role read
```

`postgres create`, `postgres connection create`, `postgres connection rotate`, and `bucket key create` print credentials exactly once. Store them in the intended secret store immediately and never echo them back. Deleting a database, restoring a backup, or deleting a bucket destroys data; do it only when the user asks, with the exact id as `--confirm`.

## Branches

```bash
npx prisma branch list --json
```

`branch` only lists. Branches are created by a stage deploy, a pushed Git branch, or `service create --branch`, and removed by deleting the Git branch of a connected repository or by the control API's `destroy`.

## Workspaces

```bash
npx prisma auth whoami --json
npx prisma auth workspace list --json
npx prisma auth workspace use <workspace-id>
npx prisma auth workspace logout <workspace-id>
```

`auth login` adds a session per workspace; `workspace use` switches. While `PRISMA_SERVICE_TOKEN` is set it overrides every stored session. `auth logout` ends all sessions.

## Bad

```bash
npx prisma service logs
```

Fails with `SERVICE.TARGET_REQUIRED`; there is no picker and no `PRISMA_SERVICE_ID` fallback.

## Good

```bash
npx prisma service logs api --project my-app --branch feat-search --tail 200 --json
```

## References

- [Deployments](https://www.prisma.io/docs/compute/deployments)
- [Environment variables](https://www.prisma.io/docs/compute/environment-variables)
- [Domains](https://www.prisma.io/docs/compute/domains)
- [`service` command](https://www.prisma.io/docs/cli/service)
