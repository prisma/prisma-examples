# automation-rest-api

Programmatic access to Compute: the Management REST API, the Composer control API, and what became of `@prisma/compute-sdk`.

## Priority

MEDIUM

## Why It Matters

Deploys now go through Composer, so low-level deploy clients from the earlier flow create resources that no `module.ts` declares. Use the CLI or the control API to deploy, and the REST API to read state, stream logs, and integrate with other tools.

## Choose the Surface

| Goal | Use |
|------|-----|
| Deploy or tear down an app | `prisma deploy`, or `deploy`/`destroy` from `@prisma/composer/control` |
| Deploy from GitHub | `prisma/cloud-deploy-action` ([`deploy-on-push.md`](deploy-on-push.md)) |
| Read services, versions, builds, logs from your own tool | REST API |
| A coding agent with its own credential and approval policy | [Agent enrollment](https://www.prisma.io/docs/prisma-compute/agent-enrollment) (REST API) |

## REST API

Base URL `https://api.prisma.io/v1`. The current OpenAPI document is at `https://api.prisma.io/v1/doc`; read it for exact payloads instead of copying shapes from memory. Authenticate with `Authorization: Bearer <workspace service token>` or an OAuth token. The Compute endpoints are marked experimental and can change.

| Resource | Paths |
|----------|-------|
| Projects | `GET/POST /v1/projects`, `GET/PATCH/DELETE /v1/projects/{id}` |
| Branches | `GET/POST /v1/projects/{projectId}/branches` (`gitName` filter), `GET/PATCH/DELETE /v1/branches/{branchId}` |
| Services | `GET/POST /v1/services` (filter by `projectId`, `branchId`, `branchGitName`), `GET/PATCH/DELETE /v1/services/{serviceId}` |
| Versions (deployments) | `GET/POST /v1/services/{serviceId}/deployments`, `GET/DELETE /v1/deployments/{deploymentId}`, `POST /v1/deployments/{deploymentId}/start`, `POST /v1/deployments/{deploymentId}/stop` |
| Promote and rollback | `POST /v1/services/{serviceId}/promote`, `POST /v1/services/{serviceId}/rollback` |
| Logs | `GET /v1/deployments/{deploymentId}/logs` |
| Builds | `GET/POST /v1/builds` (filter by `projectId`, `branchId`, `state`), `GET/PATCH /v1/builds/{buildId}` |
| Domains | `GET/POST /v1/services/{serviceId}/domains`, `GET/DELETE /v1/domains/{domainId}`, `POST /v1/domains/{domainId}/retry` |
| Environment variables | `GET/POST /v1/environment-variables` (filter by `projectId`, `class`, `key`, `branchId`), `GET/PATCH/DELETE /v1/environment-variables/{envVarId}` |

The `/v1/apps` paths (`/v1/apps`, `/v1/apps/{appId}/deployments`, `/promote`, `/rollback`, `/domains`) are deprecated. Use the `/v1/services` equivalents.

### Logs

`GET /v1/deployments/{deploymentId}/logs` takes `tail`, `from_start`, or `cursor`. A plain GET returns newline-delimited JSON: `type: "log"` records, then a `type: "terminal"` record carrying the cursor for the next page. Send `Upgrade: websocket` to follow live; a live segment ends after 10 minutes with the same terminal record, so reconnect with the cursor.

### Builds

A build record is what a deploy reports about itself: the deploy action and `prisma deploy` both write to it. `GET /v1/builds/{buildId}` returns its `state`, `failingStep`, `errorMessage`, `externalLogUrl` (for example the GitHub Actions run), and `deployedUrl`. There is no build log endpoint; the log lives at `externalLogUrl` or in the terminal that ran the deploy. `prisma deploy --build-id <id>` joins a build record your CI created with `POST /v1/builds`.

### Secrets

Environment variable values are write-only: no endpoint returns them. Do not log tokens, connection URLs, or env values.

## Control API

`@prisma/composer/control` runs the CLI's operations in-process and returns `{ ok: true, value }` or `{ ok: false, failure }` with a dotted `failure.code`:

```ts
import { deploy } from "@prisma/composer/control";
import prismaConfig from "./prisma.config.ts";

const result = await deploy({
  entry: "module.ts",
  config: { value: prismaConfig.composer, file: "prisma.config.ts" },
  stage: "pr-42",
});
if (!result.ok) throw new Error(`${result.failure.code}: ${result.failure.message}`);
```

- Operations: `deploy`, `destroy`, `dev`, `log`. `config` is required in 0.28.0.
- `deploy` and `destroy` read only `PRISMA_SERVICE_TOKEN` and `PRISMA_WORKSPACE_ID`, never the `auth login` session. Without them they fail with `environment variable PRISMA_WORKSPACE_ID is required`.
- `log` tails a locally running `prisma dev` app; it is not a platform log reader.
- The engine's own output still streams to stdio.

## `@prisma/compute-sdk`

`@prisma/compute-sdk` 0.43.0 is still on npm, and the CLI uses it internally for service operations and log streaming. Its `deploy()` build strategies and `defineComputeConfig` belong to the removed flow: no CLI command reads `prisma.compute.ts`, and its app client calls the deprecated `/v1/apps` endpoints. Do not start new deploy automation on it, and remove it from projects that used it only for `defineComputeConfig`.

## Bad

```ts
import { ComputeClient, PreBuilt } from "@prisma/compute-sdk";

await new ComputeClient(apiClient).deploy({
  strategy: new PreBuilt({ appPath: "./dist", entrypoint: "index.js" }),
  projectId: "proj_abc",
  appName: "my-app",
});
```

This creates an app outside any Composer declaration, through deprecated endpoints.

## Good

Deploy with `prisma deploy module.ts` or the control API, and read the result back with `GET /v1/services?projectId=...` and `GET /v1/deployments/{deploymentId}/logs`.

## References

- [REST API](https://www.prisma.io/docs/rest-api)
- [OpenAPI document](https://api.prisma.io/v1/doc)
- [`deploy` command and control API](https://www.prisma.io/docs/cli/deploy)
