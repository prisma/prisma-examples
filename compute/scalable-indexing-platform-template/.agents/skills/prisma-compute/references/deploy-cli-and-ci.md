# deploy-cli-and-ci

Deploy a Composer app with `prisma deploy`: production or a stage, from a workstation or from CI.

## Priority

HIGH

## Why It Matters

`deploy` does not build, chooses the project by the app's name rather than the directory link, and targets production unless told otherwise. Getting any of these wrong ships stale code, deploys into the wrong project, or changes production by accident.

## Commands

```bash
npx prisma deploy module.ts --help
npx prisma dev module.ts --help
```

| You want to | Run |
|-------------|-----|
| Run the app locally, no credentials | `npm run build && npx prisma dev module.ts` |
| Deploy a preview | `npm run build && npx prisma deploy module.ts --stage <name>` |
| Deploy production | `npm run build && npx prisma deploy module.ts` |
| Deploy under another app name | `npx prisma deploy module.ts --name <name>` |
| Write the outcome as JSON | `npx prisma deploy module.ts --report deploy-report.json` |

`<entry>` is the file whose default export is the root module, usually `module.ts`.

## Before Deploying

1. Build. `deploy` and `dev` package what the build already produced.
2. Run `npx prisma dev module.ts` and request each local URL it prints. It runs the same pipeline against local emulators, with a real local Postgres, and needs no account. `Ctrl-C` leaves local data in place.
3. Check auth: `npx prisma auth whoami --json`. If no one is signed in, ask the user to run `npx prisma auth login`; it opens a browser and cannot be done by an agent.
4. For a new project, set a region: `prismaCloud({ region })` in `prisma.config.ts` or `PRISMA_REGION`.
5. Decide the target with the user. No `--stage` changes production.

## Production and Stages

- No `--stage`: production. In platform terms the app is a project named after the root module, and production is its default branch.
- `--stage <name>`: a complete, isolated copy of the app as a preview branch of the same project, with its own services, databases, and configuration. Only the code is shared. The name must be a valid Git ref name; an invalid one fails the deploy.
- Redeploying is idempotent: the deploy compares the module with the recorded deploy state and applies the difference. Removing a `provision()` from the module deletes that resource on the next deploy. A deploy never deletes the last service, the project, or a branch.
- Deploy state lives on the platform, per branch, so a workstation and CI see the same state. Concurrent deploys of one environment take turns through a lease; a second deploy fails while the first holds it, and a crashed deploy's lease expires after about a minute.

## Which Project

The deploy finds the project in the workspace by the root module name (or `--name`) and creates it if none exists. It does not read or write `.prisma/local.json`, and it has no `--project` flag.

- A project with the same name that this module did not create can stop the deploy. Deploy with `--name <unique-name>` or rename the module.
- After the first deploy, link the directory so other commands target the project: `npx prisma project link <app-name>`. Otherwise pass `--project <app-name>` to `service`, `git`, and `project env` commands.

## Credentials

| Where | How |
|-------|-----|
| Workstation | `npx prisma auth login` once; later commands, including an agent's, reuse the stored session |
| CI or headless | `PRISMA_SERVICE_TOKEN` (a workspace service token from Console settings) and `PRISMA_WORKSPACE_ID` |
| GitHub Actions on a connected repository | OIDC through `prisma/cloud-deploy-action`; no stored secret. See [`deploy-on-push.md`](deploy-on-push.md) |

A non-empty `PRISMA_SERVICE_TOKEN` takes priority over stored sessions. A set-but-empty value is an error. Never print the token; check presence with `test -n "${PRISMA_SERVICE_TOKEN:-}"`.

Input fields bound with `envParam`/`envSecret` are stored per stage. A fresh stage starts with none, so CI must export those values; the first deploy copies missing names from the shell to the stage.

## Output

A deploy prints each step and ends with the app tree: every authored name, the platform resource it became, and public URLs.

```text
my-app
├─ db    postgres-database db_def456
└─ api   compute-service cps_abc123
         https://xyz.ewr.prisma.build
```

With `--json`, the final envelope's `result.summary.nodes[].entities[]` lists what was deployed, each with `kind`, `id`, and `url` for services. `--report <path>` (or `PRISMA_COMPOSER_REPORT_FILE`) writes the outcome as JSON, including `failure.code` when the deploy fails. Request each service URL after the deploy:

```bash
curl -i https://xyz.ewr.prisma.build
```

## CI Without GitHub

Any CI runs the same commands with the two credential variables as secrets:

```bash
npm ci
npm run build
npx prisma deploy module.ts --stage "pr-$PR_NUMBER" --json --report deploy-report.json
```

`--build-id <id>` joins a build record your CI already created through `POST /v1/builds`.

## Teardown

The CLI has no `destroy` command, and `branch` has no delete.

- Connected GitHub repository: deleting the Git branch tears down the matching preview (services, databases, buckets). Production and the default branch are never torn down this way.
- Otherwise: call `destroy` from `@prisma/composer/control` with an explicit target. It needs `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID` in the environment and the app already built:

```ts
// destroy-stage.ts
import { destroy } from "@prisma/composer/control";
import prismaConfig from "./prisma.config.ts";

const result = await destroy({
  entry: "module.ts",
  config: { value: prismaConfig.composer, file: "prisma.config.ts" },
  target: { kind: "stage", stage: "pr-42" },
});
if (!result.ok) throw new Error(`${result.failure.code}: ${result.failure.message}`);
```

`config` is required in `@prisma/composer` 0.28.0: the `composer` section and the path of the file that declares it. Pass `name` when the app was deployed with `--name`. `target` is `{ kind: "stage", stage }` or `{ kind: "production" }` and has no default. Destroying a stage removes its resources, branch, and data; destroying production removes its resources and deletes the project once it is empty. Get the user's confirmation first. The deploy action's `mode: destroy` does not work against the current CLI.

## Bad

```bash
npx prisma deploy module.ts
```

Run without a build, this deploys whatever stale output is on disk, and without `--stage` it targets production.

## Good

```bash
npm run build
npx prisma dev module.ts            # verify locally, then Ctrl-C
npx prisma auth whoami --json
npx prisma deploy module.ts --stage feat-search --json --report deploy-report.json
npx prisma project link my-app
npx prisma service list --branch feat-search --json
```

## References

- [`deploy` command](https://www.prisma.io/docs/cli/deploy)
- [Deploying](https://www.prisma.io/docs/composer/deploying)
- [Local development](https://www.prisma.io/docs/composer/local-development)
