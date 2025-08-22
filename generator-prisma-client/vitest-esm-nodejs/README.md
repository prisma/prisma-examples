# Prisma Client Example: Vitest + Node.js + ESM

This project showcases how to use the Prisma ORM with the `prisma-client` generator in an TypeScript test suite using [Vitest 3](https://vitest.dev/) in an ESM Node.js environment.

## Tech Stack

- Next.js 15
  - Runtime: Node.js 20.19.0
  - Test runner: Vitest 3
  - `package.json` contains `{ "type": "module" }`
- Prisma Client with the `prisma-client` generator
  See the [Prisma schema file](./prisma/schema.prisma) for details.
  
  ```prisma
  generator client {
    provider = "prisma-client"
    output = "../src/generated/prisma"
    previewFeatures = ["driverAdapters", "queryCompiler"]
  }

  datasource db {
    provider  = "sqlite"
    url       = "file:./dev.db"
  }
  ```

## Getting started

### 1. Clone the repository

Clone the repository, navigate into it and install dependencies:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/generator-prisma-client/vitest-esm-nodejs
pnpm install
```

### 2. Generate Prisma Client

Run:

```
pnpm prisma generate
```

### 3. Test the project

Run

```
pnpm test
```

Your output should look similar to the following:

```sh
Prisma schema loaded from prisma/schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"
Running Prisma DB push...

 Test Files 0 passed (1)
      Tests 0 passed (0)
   Start at 14:38:33
   Duration 910ms
Test database setup completed
 ✓ test/quotes.test.ts (3 tests) 63ms
   ✓ Quotes > should create a quote 50ms
   ✓ Quotes > should find quotes by kind 9ms
   ✓ Quotes > should count total quotes 4ms

 Test Files  1 passed (1)
      Tests  3 passed (3)
```

## Resources

- Check out the [Prisma docs](https://www.prisma.io/docs)
- [Join our community on Discord](https://pris.ly/discord?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) to share feedback and interact with other users.
- [Subscribe to our YouTube channel](https://pris.ly/youtube?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for live demos and video tutorials.
- [Follow us on X](https://pris.ly/x?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section) for the latest updates.
- Report issues or ask [questions on GitHub](https://pris.ly/github?utm_source=github&utm_medium=prisma_examples&utm_content=next_steps_section).
