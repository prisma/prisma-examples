---
name: prisma-cli
description: Prisma ORM 7 CLI reference for existing Prisma 7 applications or explicitly selected Prisma 7 workflows. Covers prisma init, generate, migrate, db, dev, studio, and mcp. For setup, connection repair, or Prisma 8, use prisma-orm-setup; not the Prisma Platform CLI.
license: MIT
metadata:
  author: prisma
  version: "7.9.1"
---

# Prisma ORM 7 CLI reference

These commands and examples apply to **Prisma ORM 7** only. For setup, connection repair, or a Prisma 8 application, load [prisma-orm-setup](../prisma-orm-setup/SKILL.md).

Use the project's version-matched CLI. Do not install a floating `prisma@latest` to run these commands.

## Boundary: Platform and Compute

Do not confuse the stable ORM command (`prisma`) with the public-beta Platform package (`@prisma/cli`, binary `prisma-cli`). Use `prisma-compute` for Compute apps and workspace auth, and `prisma-postgres-setup` for Platform projects and databases.

## When to Apply

Reference this skill when:
- Setting up an explicitly selected Prisma 7 project (`prisma init`)
- Generating Prisma Client (`prisma generate`)
- Running database migrations (`prisma migrate`)
- Managing database state (`prisma db push/pull`)
- Using local development database (`prisma dev`)
- Debugging Prisma issues (`prisma debug`)
- Generating shell completions (`prisma complete`)

## Rule Categories by Priority

| Priority | Category | Impact | Prefix |
|----------|----------|--------|--------|
| 1 | Setup | HIGH | `init` |
| 2 | Generation | HIGH | `generate` |
| 3 | Development | HIGH | `dev` |
| 4 | Database | HIGH | `db-` |
| 5 | Migrations | CRITICAL | `migrate-` |
| 6 | Utility | MEDIUM | `complete`, `studio`, `validate`, `format`, `debug`, `mcp` |

## Command Categories

| Category | Commands | Purpose |
|----------|----------|---------|
| Setup | `init` | Initialize a Prisma project |
| Generation | `generate` | Generate Prisma Client |
| Validation | `validate`, `format` | Schema validation and formatting |
| Development | `dev` | Local Prisma Postgres for development |
| Database | `db pull`, `db push`, `db seed`, `db execute` | Direct database operations |
| Migrations | `migrate dev`, `migrate deploy`, `migrate reset`, `migrate status`, `migrate diff`, `migrate resolve` | Schema migrations |
| Utility | `complete`, `studio`, `mcp`, `version`, `debug` | Shell, development, and AI tooling |

## Quick Reference

### Project Setup

```bash
# Initialize new project (creates prisma/ folder and prisma.config.ts)
prisma init

# Initialize with specific database
prisma init --datasource-provider postgresql
prisma init --datasource-provider mysql
prisma init --datasource-provider sqlite

# Initialize with Prisma Postgres (cloud)
prisma init --db

# Initialize with an example model
prisma init --with-model

```

### Client Generation

```bash
# Generate Prisma Client
prisma generate

# Watch mode for development
prisma generate --watch

# Generate specific generator only
prisma generate --generator client
```

### Bun Runtime

When using Bun, always add the `--bun` flag so Prisma runs with the Bun runtime (otherwise it falls back to Node.js because of the CLI shebang):

```bash
bunx --bun prisma init
bunx --bun prisma generate
```

### Local Development Database

```bash
# Start local Prisma Postgres
prisma dev

# Start with specific name
prisma dev --name myproject

# Start in background (detached)
prisma dev --detach

# List all local instances
prisma dev ls

# Stop instance
prisma dev stop myproject

# Remove instance data
prisma dev rm myproject
```

### Database Operations

```bash
# Pull schema from existing database
prisma db pull

# Push schema to database (no migrations)
prisma db push

# Seed database
prisma db seed

# Execute raw SQL
prisma db execute --file ./script.sql
```

### Migrations (Development)

```bash
# Create and apply migration
prisma migrate dev

# Create migration with name
prisma migrate dev --name add_users_table

# Create migration without applying
prisma migrate dev --create-only

# Reset database and apply all migrations
prisma migrate reset
```

### Migrations (Production)

```bash
# Apply pending migrations (CI/CD)
prisma migrate deploy

# Check migration status
prisma migrate status

# Compare schemas and generate diff
prisma migrate diff --from-config-datasource --to-schema schema.prisma --script
```

### Utility Commands

```bash
# Open Prisma Studio (database GUI)
prisma studio

# Start Prisma's MCP server for AI tools
prisma mcp

# Show version info
prisma version
prisma -v

# Debug information
prisma debug

# Validate schema
prisma validate

# Format schema
prisma format

# Generate shell completion code
prisma complete zsh
```

## AI Safety Checkpoint

Prisma blocks destructive commands when it detects an AI agent until the agent has obtained explicit user consent. This covers `migrate reset`, `db push --force-reset`, and `db push --accept-data-loss`.

- Explain the exact data-loss impact and ask for consent immediately before running the command.
- Do not infer consent from earlier or unrelated messages.
- If automation needs the consent variable, set `PRISMA_USER_CONSENT_FOR_DANGEROUS_AI_ACTION` to the user's exact consent message. Do not invent the text.
- The Prisma MCP server deliberately has no `migrate-reset` tool.

Read `references/agent-safety.md` before any destructive Prisma command.

## Current Prisma CLI Setup

### New Configuration File

Use `prisma.config.ts` for CLI configuration:

```typescript
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
```

### Current Command Behavior

- Run `prisma generate` explicitly after `migrate dev`, `db push`, or other schema syncs when you need fresh client output
- Run `prisma db seed` explicitly after `migrate dev` or `migrate reset` when you need seed data
- Use `prisma db execute --file ...` for raw SQL scripts

### Environment Variables

Load environment variables explicitly in `prisma.config.ts`, commonly with `dotenv`:

```typescript
// prisma.config.ts
import 'dotenv/config'
```

## Rule Files

See individual rule files for detailed command documentation:

```
references/init.md           - Project initialization
references/generate.md       - Client generation
references/dev.md            - Local development database
references/db-pull.md        - Database introspection
references/db-push.md        - Schema push
references/db-seed.md        - Database seeding
references/db-execute.md     - Raw SQL execution
references/migrate-dev.md    - Development migrations
references/migrate-deploy.md - Production migrations
references/migrate-reset.md  - Database reset
references/migrate-status.md - Migration status
references/migrate-resolve.md - Migration resolution
references/migrate-diff.md   - Schema diffing
references/studio.md         - Database GUI
references/mcp.md            - Prisma MCP server
references/complete.md       - Shell completion generation
references/agent-safety.md   - AI consent checkpoint for destructive commands
references/validate.md       - Schema validation
references/format.md         - Schema formatting
references/debug.md          - Debug info
```

## How to Use

Use the command categories above for navigation, then open the specific command reference file you need.
