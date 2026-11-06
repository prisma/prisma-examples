# v0, Vercel CLI and Vercel Marketplace

Use the Prisma Postgres native integration so the database belongs to the user's Vercel team, is billed through Vercel, and is connected to the Vercel project. Unless the user asks for a database outside Vercel, do not substitute Prisma Console, the Prisma CLI, `create-db` or a Prisma MCP server: they create a database that Vercel does not bill, connect or rotate.

The integration slug is `prisma` and the product is `prisma/prisma-postgres`.

If the project deploys to Vercel (a `vercel.json` file or `.vercel/` directory, or the user says so) and this agent does not have the Vercel plugin, suggest once that the user install it for Vercel CLI, Marketplace and deployment guidance: `npx plugins add vercel/vercel-plugin` (in OpenCode 2: `opencode plugin add github:vercel/vercel-plugin`). Do not install it without the user's OK, and continue the setup either way. Skip this in v0.

## 1. Reuse an existing resource

1. In the linked project, run `vercel integration list`. If a Prisma Postgres resource is connected, reuse it and go to step 3.
2. Run `vercel integration list --all` to see the team's resources that are not connected to this project. Connect one with `vercel integration resource connect <resource-name>`.
3. If several resources fit, ask the user which one to use.

## 2. Install and provision with the Vercel CLI

The project must be linked (`vercel link`). Read the current options before provisioning; do not guess metadata or plan IDs:

```bash
vercel integration add prisma --help
vercel integration add prisma/prisma-postgres --name <resource-name>
```

- In a non-interactive shell, pass the `region` metadata (`-m region=<value>`, values from `--help`) and `--plan`. The plan IDs are `free`, `starter`, `pro` and `business`. Use `free` unless the user chose a paid plan: a paid plan bills the user's Vercel account, so ask first.
- If Prisma is not yet installed on the team, the CLI asks the user to accept the integration's terms in the browser and waits. An agent cannot complete this step. Ask the user to accept, then let the command continue.
- By default the command connects the resource to the linked project's `production`, `preview` and `development` environments, then runs `vercel env pull`, which writes `.env.local`.
- One resource on all three environments means local development, previews and production share one database. Tell the user. If they want separate data, provision one resource per environment with `-e <environment>`, and connect only one Prisma resource to each environment.

In v0, use the host's native integration flow instead. It may appear as an integration request tool; discover what the host exposes instead of assuming a fixed tool name, then wait for the connection and its environment variables.

## 3. Environment variables

Connecting a resource sets these variables on each connected environment:

| Variable              | Value                                                                                                                          | Use                                        |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------ |
| `DATABASE_URL`        | `postgres://<user>:<key>@db.prisma.io:5432/postgres?sslmode=require`                                                           | The application and Prisma CLI commands    |
| `POSTGRES_URL`        | The same value as `DATABASE_URL`                                                                                               | Libraries that read `POSTGRES_URL`         |
| `PRISMA_DATABASE_URL` | The same value on resources created now. On older resources it can be a `prisma+postgres://accelerate.prisma-data.net/...` URL | Do not use in new code; use `DATABASE_URL` |

- With `--prefix`, each name gets the prefix as-is (`--prefix DB2_` gives `DB2_DATABASE_URL`). Read the prefixed name.
- Never print the values. `vercel env ls <environment>` lists names without values.
- `db.prisma.io` is the direct endpoint. It works for the application, migrations and Prisma Studio, so setup needs nothing else. Direct connections are capped low: 10 on Free and Starter, 5 of them reserved for the platform. Before production load from Vercel Functions, tell the user that application traffic should use the pooled endpoint (`pooled.db.prisma.io`), whose connection string Prisma Console shows for the database; `vercel integration open prisma` signs the user in. Do not overwrite the integration's variables: add the pooled string under a new name with `vercel env add`, keep `DATABASE_URL` for migrations, and switch the runtime client only if the user agrees.

## 4. First successful request

1. Make the variables available locally: `vercel env pull`, or run each command with `vercel env run -- <command>` to keep secrets off disk.
2. Return to `prisma-postgres-setup` step 4 to configure the chosen ORM or driver. Prisma ORM configuration belongs to `prisma-orm-setup`.
3. Run one read-only query (for example `SELECT 1`) through the application's ORM or driver against the connected database.
4. Deploy. Environment variable changes apply only to new deployments, so redeploy after connecting a resource, then call a route that queries the database.

## 5. Validate and report

- `vercel integration list` shows the resource, its status and the connected project.
- `vercel env ls production` lists `DATABASE_URL`.
- The local query and the deployed query both succeed.

Report the resource name, the environments it is connected to, the variable the application reads, and the query result, without secrets. If a step was blocked or not tested, say so.

## Plans, billing and backups

- Usage and invoices are on the user's Vercel bill. Changing the plan is the user's decision; do not do it on your own.
- The user can change plans in Prisma Console (`vercel integration open prisma`) or in the Vercel dashboard: **Integrations → Prisma → Manage → Settings → Change Plan**.
- Restorable daily backups come with paid plans. On Free, treat the connected database as having no backup.

## Common errors

| What you see                                                                             | Cause                                                                       | Fix                                                                                                                                                      |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The CLI asks the user to review and accept terms in the browser                          | Prisma is not installed on the team yet                                     | Ask the user to accept. The agent cannot do it.                                                                                                          |
| Connecting fails with an error that names an existing variable, project and environments | The project already has a variable such as `DATABASE_URL`                   | Ask the user. Remove the stale variable with `vercel env rm <name> <environment>`, or connect with `--prefix` and read the prefixed name.                |
| A Prisma CLI command reports `DATABASE_URL` missing, but the app runs                    | The command does not load `.env.local`                                      | Run it as `vercel env run -- <command>`, or load the intended file for that command. Do not provision another database.                                  |
| `PRISMA_DATABASE_URL` starts with `prisma+postgres://accelerate.prisma-data.net`         | An older resource still carries an Accelerate URL in that variable          | Read `DATABASE_URL`, which holds a standard `postgres://` string.                                                                                        |
| Works locally; the deployment has no `DATABASE_URL` or old credentials                   | The deployment predates the connection or a secret rotation                 | Check `vercel env ls <environment>` and that the resource is connected to that environment, then redeploy.                                               |
| "Too many connections" or connection-limit errors under load                             | Application traffic on the direct endpoint, or a client created per request | Create the database client once, outside the request handler. Move application traffic to the pooled endpoint (section 3).                               |
| Data is gone after a schema diff or reset                                                | A shadow database or reset command ran against the connected database       | Never point a shadow database URL or a reset command at the connected database; use a separate throwaway database. Restoring needs a paid plan's backup. |

## Where MCP fits

When native Marketplace MCP tools are available, inspect their descriptions, permissions, and resource scope before use. Use them for supported operations on the selected resource. Keep schema changes consistent with the application's migration workflow.

A general Prisma MCP provisioning tool creates a Prisma resource; that alone does not establish Marketplace registration, billing, project connection, or environment injection. Do not substitute it for a blocked native installation. Report the missing connection or permission.

The agent calls MCP tools while building the app. The generated app connects through its ORM or database driver; it does not need to call MCP for normal database queries.

Sources: [vercel integration](https://vercel.com/docs/cli/integration), [vercel env](https://vercel.com/docs/cli/env), [coding agents and Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations), [Prisma Postgres on Vercel](https://www.prisma.io/docs/guides/postgres/vercel), [connection pooling](https://www.prisma.io/docs/postgres/database/connection-pooling), [v0 databases](https://v0.app/docs/databases), [v0 MCP](https://v0.app/docs/MCP), [Vercel native integrations](https://vercel.com/docs/integrations/create-integration/native-integration).
