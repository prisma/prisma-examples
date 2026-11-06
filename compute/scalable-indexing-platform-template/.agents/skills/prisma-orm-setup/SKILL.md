---
name: prisma-orm-setup
description: Set up Prisma ORM in an application, connect its database, or troubleshoot the connection of an existing Prisma 6, 7, or 8 app. Defaults new applications to Prisma ORM 8 and loads the package-owned prisma-8 skill; keeps existing Prisma 6/7 apps on their version with provider references for PostgreSQL, MySQL, SQLite, SQL Server, CockroachDB, MongoDB, and Prisma Postgres.
license: MIT
metadata:
  author: prisma
  version: "1.0.0"
---

# Prisma ORM setup

This skill owns ORM version selection for setup and connection work. Preserve the application's ORM version and intended database. A connection repair does not require a major upgrade.

New applications default to **Prisma ORM 8**. Detailed Prisma 8 configuration, queries, migrations, and runtime code belong to the versioned [prisma-8 skill](https://github.com/prisma/orm/tree/main/skills/prisma-8) shipped with the ORM package.

## 1. Detect the starting point

Read the package manifest, lockfile, Prisma configuration, schema, and application imports. Identify the ORM version, database provider, and runtime. The CLI version alone does not identify the application's version: a Prisma 8 CLI can coexist with a legacy client, so inspect `@prisma/client`, `@prisma/prisma7`, and the schema and configuration.

| Starting point                                          | Path                                                     |
| ------------------------------------------------------- | -------------------------------------------------------- |
| Prisma 8 application                                    | Step 4, without reinitializing                           |
| New application without a version choice                | Step 3                                                   |
| Prisma 6 or 7 application, or an explicit earlier major | [Step 5](#5-set-up-or-repair-an-earlier-version)         |

For a new application, check the selected Prisma 8 release's [provider support](https://www.prisma.io/docs/orm/supported-databases) and runtime requirements before installing. If the provider is unsupported, explain the limitation and offer an explicitly selected earlier version. Keep the requested database; do not silently fall back or invent a supported target.

Use an existing database when supplied. Load `prisma-postgres-setup` only when Prisma Postgres is needed and no connection has been selected yet; return here once connected.

## 2. Handle requested major upgrades separately

When the user requests a major upgrade, load a workflow that supports the source version and provider. For PostgreSQL 7-to-8, use the [Prisma migration guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/postgresql); for MongoDB 6-to-8, use [prisma-mongodb-upgrade](../prisma-mongodb-upgrade/SKILL.md). Other providers need an explicitly supported migration path. `prisma-upgrade-v7` covers **6 to 7**; the package-owned `prisma-8` upgrade reference covers updates within 8.

## 3. Bootstrap a new Prisma 8 application

Check the selected release's [runtime requirements](https://www.prisma.io/docs/orm/release-status) and [initialization guide](https://www.prisma.io/docs/cli/orm-init). Resolve and pin a published Prisma CLI **8** release, including its prerelease suffix if needed; verify its version before initialization. Do not rely on a floating `latest` remaining version 8.

Use the project's package manager to run the installed CLI. For PostgreSQL and Prisma schema language authoring:

```bash
prisma orm init --yes --target postgres --authoring psl
```

Use the supported target for the selected provider. Preserve existing application files and connection configuration; do not let setup provision an unrelated database. Verify that the resolved ORM package is version 8 before proceeding.

## 4. Load the installed Prisma 8 guidance

Run the installed CLI through the project's package manager:

```bash
prisma skills sync
```

Then **read** the synced `prisma-8/SKILL.md`, for example `.agents/skills/prisma-8/SKILL.md`, and follow its preconditions and selected references. Syncing alone does not load the instructions. If the package-owned guidance cannot be loaded, report the blocker. Continue with step 6.

## 5. Set up or repair an earlier version

For a new setup that explicitly selects an earlier version, pin packages to that major and use its runtime requirements. Keep the CLI, client, and SQL adapter releases compatible. Existing dependencies need not change for a connection repair.

- **Prisma 7 SQL:** use the provider reference below and [client setup](references/v7-client-setup.md).
- **Prisma 6 MongoDB:** use [MongoDB setup](references/v6-mongodb.md). SQL driver adapters do not apply.
- **Prisma 6 SQL:** preserve its generator, schema URL, and client initialization. Use the provider's connection details below and the [Prisma 6 documentation](https://www.prisma.io/docs/orm/v6); do not copy the Prisma 7 configuration or adapter examples into it.

| Database                         | Reference                                                 |
| -------------------------------- | --------------------------------------------------------- |
| PostgreSQL                       | [PostgreSQL](references/v7-postgresql.md)                 |
| MySQL / MariaDB / PlanetScale    | [MySQL](references/v7-mysql.md)                           |
| SQLite / Turso                   | [SQLite](references/v7-sqlite.md)                         |
| Microsoft SQL Server / Azure SQL | [SQL Server](references/v7-sqlserver.md)                  |
| CockroachDB                      | [CockroachDB](references/v7-cockroachdb.md)               |
| MongoDB / Atlas on Prisma 6      | [MongoDB](references/v6-mongodb.md)                       |
| Prisma Postgres with Prisma 7    | [Prisma Postgres](references/v7-prisma-postgres.md)       |

The Prisma 7 SQL examples were verified with Prisma 7.10.0; the MongoDB examples with Prisma 6.19.3.

## 6. Connect and verify

The CLI and the application can load different environment files. Load the intended environment for each without printing secrets, and keep credentials in ignored environment files or the host's secret configuration. For SQL adapters, make the adapter's runtime options address the same database as the CLI connection URL.

For an existing app, preserve schema, migrations, and generator configuration unless the requested work requires changes. Diagnose the connection before running schema-changing commands.

Run the project's relevant checks and a read-only query through the application's client against the intended database. Report the ORM version, the loaded `prisma-8` skill version where applicable, and the query result. Package installation or a successful skill sync alone is not a completed setup.
