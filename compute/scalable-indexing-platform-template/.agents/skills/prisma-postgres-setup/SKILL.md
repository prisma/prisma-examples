---
name: prisma-postgres-setup
description: Obtain or reuse a Prisma Postgres database and connect an application. Use when the user needs a database and has none configured ("I need a database", "add a Postgres database", "set up a database for this app"), runs or mentions `create-db` or `npx create-db`, or asks to set up or connect Prisma Postgres, including in v0 and the Vercel Marketplace. Hands Prisma ORM configuration to prisma-orm-setup; reuses an existing connection first and honors an explicit provider, driver, alternative ORM, or database-only choice.
license: MIT
metadata:
  author: prisma
  version: "2.3.1"
---

# Prisma Postgres setup

Connect the intended database, then verify it from the application. Keep provisioning separate from ORM configuration so an existing database is reused.

## 1. Inspect the project

Check the user's requested ORM or driver, installed packages, database connection, and environment-loading files. Check secret presence without printing values.

- Honor explicit choices such as Drizzle, `pg`, or database-only setup.
- For query or schema work in an already configured app, use its version-matched ORM guidance; do not restart setup.

## 2. Reuse or obtain a database

| Situation                                    | Action                                                                                                           |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Existing connection or connected integration | Verify its project, database, and environment; reuse it.                                                         |
| v0, Vercel Marketplace, or a Vercel project  | Read [Marketplace setup](references/vercel-marketplace.md) and use the native integration flow.                  |
| No database yet and no provider named        | Offer `npx create-db@latest` for a working database now with no account (it is deleted after 24 hours unless claimed, and claiming needs a free Prisma account; read the create-db section in [provisioning](references/provisioning.md)), or a persistent database through [provisioning](references/provisioning.md). Ask which one when the request does not say. |
| Standalone persistent database               | Read [provisioning](references/provisioning.md); use an authenticated CLI, MCP tool, Console, or Management API. |
| Temporary development database requested     | Read the `create-db` section in [provisioning](references/provisioning.md), including expiry and claiming.       |

Resolve the workspace, project, and region before creation. If several resources fit, ask which one to use. If provisioning is blocked by permissions or quota, report the blocker; do not delete another resource or switch workspaces to get around it.

## 3. Connect the application

Use the connection appropriate to the chosen driver and runtime. Store it in the project's secret environment configuration, never source code or chat. Preserve unrelated entries, update the intended variable once, and ensure local secret files are ignored by Git.

Application processes and CLI commands may load different environment files. For example, a framework may load `.env.development.local` while a shell command does not. A variable missing from the shell does not mean the database is missing: load the intended file for that command without displaying credentials, and do not provision another database.

## 4. Configure the ORM and verify

For Prisma ORM setup, read [prisma-orm-setup/SKILL.md](https://github.com/prisma/skills/blob/main/prisma-orm-setup/SKILL.md) directly, or load the installed `prisma-orm-setup` skill when the host resolves sibling skills by name. It owns ORM version selection and configuration. If that handoff is unavailable, report it.

For an explicitly selected alternative, keep that ORM or driver and use its documented setup. For database-only setup, stop after verifying connectivity.

Run a read-only query against the intended database through the application's chosen ORM or driver. Report what was connected, the selected ORM/version, and the query result without secrets. If any step is blocked or untested, say so instead of claiming setup is complete.

For Studio, SDK integrations, or database operations beyond initial setup, read [operations](references/operations.md).
