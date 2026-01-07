# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is the official `prisma-examples` repository containing ready-to-run example projects demonstrating Prisma ORM, Prisma Accelerate, Prisma Optimize, and deployment patterns. Each example is self-contained with its own dependencies and documentation.

## Directory Structure

- `/orm/` - Prisma ORM examples (fullstack and backend frameworks)
- `/accelerate/` - Prisma Accelerate examples (connection pooling and caching)
- `/optimize/` - Prisma Optimize examples (query performance)
- `/databases/` - Database-specific implementations (PostgreSQL, MongoDB, CockroachDB, etc.)
- `/deployment-platforms/` - Platform deployment patterns (AWS Lambda, Vercel, etc.)
- `/generator-prisma-client/` - Examples using the new `prisma-client` generator

## Working with Individual Examples

Each example is independent. To run an example:

```bash
cd orm/express  # or any example directory
npm install
# Set up DATABASE_URL in .env (check example's README)
npx prisma migrate dev --name init
npx prisma db seed  # if seed script exists
npm run dev
```

Common scripts across examples:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npx prisma studio` - Open Prisma Studio
- `npx prisma migrate dev` - Create and apply migrations

## Testing

Tests run via `.github/scripts/test-all.sh`. Each example has a corresponding test script at `.github/tests/{category}/{example}/run.sh`.

### Running Tests Locally

Run all tests:
```bash
./run-all-tests.sh
```

Run a single example's test:
```bash
bash .github/tests/orm/express/run.sh
bash .github/tests/orm/nextjs/run.sh
# etc.
```

Tests use `@prisma/dev` to spin up a temporary database. The test pattern:
1. Start Prisma Dev server (provides DATABASE_URL)
2. Install example dependencies
3. Run migrations and seed
4. Start the app
5. Run health checks or Postman collections (in `.github/tests/postman_collections/`)
6. Cleanup

## Code Style

Prettier configuration (`.prettierrc`):
- No semicolons
- Single quotes
- Trailing commas

EditorConfig: 2 spaces, UTF-8, LF line endings

## Adding New Examples

Per CONTRIBUTING.md:
1. Open an issue first to discuss the example concept
2. Follow the standard example structure:
   - `package.json` with standard scripts
   - `prisma/schema.prisma` with blogging domain (User/Post models)
   - Clear README with setup instructions
   - Test script in `.github/tests/`
3. Use conventional commits

Example guidelines:
- Simple and minimal, focused on one Prisma use case
- READMEs must end with a running example
- Schema patterns should be consistent across similar examples

## Node Version

Uses Node.js LTS/Hydrogen (v22) - see `.nvmrc`

## Key Prisma Packages

Most examples use:
- `prisma` - CLI
- `@prisma/client` - Database client
- `@prisma/adapter-pg` - PostgreSQL adapter (for driver adapters)
