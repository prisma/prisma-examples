# app-composer-setup

Compute deploys only Prisma Composer apps: a root module, one service declaration per server, and a `composer` section in `prisma.config.ts`.

## Priority

CRITICAL

## Why It Matters

`prisma deploy` takes a module file, not a framework name or a config file. Without `module.ts`, a `compute()` service, and the `composer` config section, there is nothing to deploy. This file covers the minimum an agent needs. For contracts between services, input schemas, modules, and testing, use the `prisma-composer-core-concepts` skill and the [Composer docs](https://www.prisma.io/docs/composer).

## Requirements

- Node.js 22.18 or newer on the 22 line, 24.11 or newer on the 24 line, or 26 or newer (`engines.node` is `^22.18.0 || ^24.11.0 || >=26.0.0` since Composer 0.30.0). Composer loads the `.ts` entry directly; older versions stop at `ERR_UNKNOWN_FILE_EXTENSION`.
- Bun. Deployed services run on Bun, and `bun build --target=bun` is the simplest way to produce the single-file entry a service needs.
- The packages:

```bash
npm install @prisma/composer @prisma/composer-prisma-cloud
npm install -D prisma
npx prisma skills sync
```

`@prisma/composer` pins its own `effect` version; do not add a different `effect` to the app. See [`debug-deploy-failures.md`](debug-deploy-failures.md) if `prisma.config.ts` fails to evaluate.

## The Four Files

```ts
// src/server.ts
import service from "./service.ts";

Bun.serve({
  port: service.port(),
  hostname: "0.0.0.0",
  fetch: () => new Response("ok"),
});
```

```ts
// src/service.ts
import node from "@prisma/composer/node";
import { compute } from "@prisma/composer-prisma-cloud";

export default compute({
  name: "web",
  deps: {},
  build: node({ module: import.meta.url, entry: "../dist/server.mjs" }),
});
```

```ts
// module.ts
import { module } from "@prisma/composer";
import web from "./src/service.ts";

export default module("my-app", ({ provision }) => {
  provision(web);
});
```

```ts
// prisma.config.ts
import { defineConfig as composer } from "@prisma/composer/config";
import { nodeBuild } from "@prisma/composer/node/control";
import { prismaCloud, prismaState } from "@prisma/composer-prisma-cloud/control";
import { definePrismaConfig } from "prisma/config";

export default definePrismaConfig({
  composer: composer({
    extensions: [prismaCloud({ region: "us-east-1" }), nodeBuild()],
    state: prismaState(),
  }),
});
```

And a build script in `package.json` that produces the file `entry` points at:

```json
{
  "scripts": {
    "build": "bun build src/server.ts --target=bun --outfile dist/server.mjs"
  }
}
```

Rules:

- `entry` and `dir` resolve relative to the service module (`module: import.meta.url`), not the project root.
- The `composer` section accepts only `extensions` and `state`. Add `nextjsBuild()` from `@prisma/composer/nextjs/control` when a service uses the `nextjs` adapter.
- `prisma.config.ts` is read by the CLI only; app code never imports it. A separate `prisma-composer.config.ts` is refused.
- Inside the module graph, write relative imports with explicit `.ts` extensions and enable `allowImportingTsExtensions` in `tsconfig.json`.

## Region

The first deploy creates the project and needs a region. Set `prismaCloud({ region })` or `PRISMA_REGION`; the config value wins when both are set. Without either, the deploy stops with `project "<name>" does not exist yet and no deploy region is configured`. Once the project exists it keeps its region, and stages inherit it.

Region ids: `us-east-1`, `us-west-1`, `eu-west-3`, `eu-central-1`, `ap-northeast-1`, `ap-southeast-1`.

## Names

- The root module name (`module("my-app", ...)`) becomes the project name and may contain hyphens. `deploy --name <name>` overrides it.
- `compute({ name })` and `provision()` ids allow `[A-Za-z0-9]` only. A hyphenated id passes `tsc` and then fails at load. The platform rejects provision ids shorter than three characters, so name a database `database`, not `db`.

## Databases

Declare the database as a dependency of the service and provision it in the module that owns it. The service reads the value with `service.load()`.

```ts
// src/service.ts
import node from "@prisma/composer/node";
import { compute, rawPostgres } from "@prisma/composer-prisma-cloud";

export default compute({
  name: "api",
  deps: { db: rawPostgres() },
  build: node({ module: import.meta.url, entry: "../dist/server.mjs" }),
});
```

```ts
// module.ts
import { module } from "@prisma/composer";
import { rawPostgres } from "@prisma/composer-prisma-cloud";
import api from "./src/service.ts";

export default module("my-app", ({ provision }) => {
  const db = provision(rawPostgres({ name: "database" }));
  provision(api, { deps: { db } });
});
```

```ts
// src/server.ts
import { SQL } from "bun";
import service from "./service.ts";

const { db } = service.load();
const sql = new SQL({ url: db.url, max: 1, idleTimeout: 10 });
```

- `rawPostgres()` comes from the package root and delivers `{ url }`. You own the client and the schema; the deploy runs no migrations for it.
- `postgres(contract)` comes from `@prisma/composer-prisma-cloud/orm`, together with `dataContract`. It delivers `{ url, client }` with a client typed by your Prisma ORM data contract, and the deploy applies the committed `migrations/` before the service starts. Every schema change goes through `prisma contract emit` and `prisma migration plan` first. See [Databases](https://www.prisma.io/docs/composer/databases).
- `postgres` is not exported from the package root in 0.28.0, and `postgres()` with no argument does not declare a plain database. Use `rawPostgres()` for that.
- Each stage gets its own empty databases. Production data is never copied.

Buckets work the same way: `bucket()` from the package root, delivering `{ url, bucket, accessKeyId, secretAccessKey }`.

## Configuration and Secrets

Composer services do not read `process.env`. Declare the service's configuration as an input schema, and bind each field at `provision()` to a literal, `envParam("NAME")`, or `envSecret("NAME")`. The named values live in the stage's platform environment variables (`project env`). A deploy copies a missing name from the deploying shell and fails early, naming the variable, when neither has it. See [Service input](https://www.prisma.io/docs/composer/service-input).

## Porting From `prisma.compute.ts`

| `prisma.compute.ts` field | Composer equivalent |
|---------------------------|---------------------|
| `app.name` / `apps.<key>` | `compute({ name })`; the root module name is the project name |
| `framework`, `build.command` | Your own `build` script, run before `deploy` |
| `entry`, `build.outputDirectory`, `build.entrypoint` | `node({ module, entry })` or `node({ module, dir, entry })` pointing at built output, or `nextjs({ module, appDir })` |
| `httpPort` | Removed. Listen on `service.port()` |
| `env` file | Platform env vars through `project env add --file`, bound with `envParam`/`envSecret`; a database becomes a declared dependency |
| `region` | `prismaCloud({ region })`, used only when the first deploy creates the project |
| `apps` (monorepo) | One `compute()` per deployable app, all provisioned in one `module.ts` |
| `--branch <name>` on deploy | `deploy --stage <name>` |

Then delete `prisma.compute.ts`, the `compute:deploy` script, and the `@prisma/compute-sdk` dev dependency if nothing else imports it. `.prisma/cli/state.json` from the old CLI is no longer used.

## Bad

```ts
// prisma.compute.ts
import { defineComputeConfig } from "@prisma/compute-sdk/config";

export default defineComputeConfig({
  app: { framework: "hono", entry: "src/index.ts", httpPort: 8080 },
});
```

No current command reads this file.

## Good

`module.ts`, `src/service.ts`, and the `composer` section of `prisma.config.ts` as shown above, with a build script that writes the file `entry` names.

## References

- [Deploy your first app](https://www.prisma.io/docs/prisma-compute/deploy)
- [Port an existing app](https://www.prisma.io/docs/composer/porting-an-app)
- [Composer getting started](https://www.prisma.io/docs/composer/getting-started)
