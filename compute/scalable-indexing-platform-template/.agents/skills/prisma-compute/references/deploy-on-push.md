# deploy-on-push

Deploy every pushed branch from the repository's own GitHub Actions with `prisma/cloud-deploy-action`.

## Priority

HIGH

## Why It Matters

The platform does not build on push. A connected repository without a workflow deploys nothing and reports no error, and a workflow without the connection skips with a green run. Both pieces are required, and a push to the default branch deploys production without any further prompt.

## How It Works

1. **The connection.** `prisma git connect` installs the Prisma GitHub App (if needed) and links the repository to the project. It lets workflow runs exchange their GitHub OIDC token for a 30-minute workspace token, and it tears down a preview when its Git branch is deleted.
2. **The workflow.** `prisma/cloud-deploy-action` runs install, your build command, and `prisma deploy <module>`. The default branch deploys production; any other branch deploys a stage named after it.

The Console can do both at once: importing the repository there opens a pull request that adds the workflow. The CLI only creates the connection.

## Setup From the CLI

```bash
npx prisma project link <app-name>          # deploy does not link the directory
npx prisma git connect                      # uses the origin remote; needs an interactive terminal
```

`git connect` opens a browser for the GitHub App install and waits, so a person has to run it. With `--no-interactive` it fails with `CLI.INTERACTION_REQUIRED`; use the Console instead in that case. It fails with `PROJECT.SETUP_REQUIRED` when the directory is not linked.

Then commit the workflow:

```yaml
# .github/workflows/prisma-deploy.yml
name: prisma-deploy

on:
  push:

concurrency:
  group: prisma-deploy-${{ github.ref }}
  cancel-in-progress: false

permissions:
  contents: read
  id-token: write

jobs:
  deploy:
    if: github.ref_type == 'branch'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: oven-sh/setup-bun@v2
      - uses: prisma/cloud-deploy-action@v1
        with:
          build-command: npm run build
```

- `id-token: write` is required for the OIDC exchange.
- Bun 1.3.10 or newer must be on the runner `PATH`; `oven-sh/setup-bun@v2` provides it.
- GitHub reads the workflow from the pushed commit, so a branch created before the file existed deploys nothing until it contains the file.

## Action Inputs and Outputs

Inputs (from `action.yml` in v1.9.0):

| Input | Default | Notes |
|-------|---------|-------|
| `build-command` | `npm run build` | Run verbatim; `none` skips the build |
| `install-command` | auto | `npm ci` or `bun install --frozen-lockfile` from the lockfile; pnpm and yarn need an explicit value |
| `module` | `module.ts` | The Composer entry |
| `stage` | derived | Empty: default branch is production, other branches become a stage of the same name |
| `working-directory` | `.` | For monorepos |
| `prisma-version` | `8.0.0-rc.9` | Used only when the repository has no `prisma` dev dependency; otherwise the installed version deploys |
| `mode` | `deploy` | `destroy` does not work against the current CLI |

Outputs: `outcome` (`succeeded`, `failed`, `skipped-no-credential`), `url` (root service), `urls` (JSON map of service address to URL), `build-id`, `report-path`. Repositories that are not connected can pass `PRISMA_SERVICE_TOKEN` from a secret in the step's `env`; an explicit token wins over OIDC.

## Checking a Push

- Watch the run in the repository's Actions tab. The job summary lists each service URL and, on failure, the cause.
- `outcome: skipped-no-credential` means the repository is not connected, `id-token: write` is missing, or the run came from a fork.
- `CLI.UNKNOWN_COMMAND` in the deploy step means an action release up to v1.5.0, which called the removed `prisma composer` commands. Use `@v1` (v1.9.0 or later).
- From a terminal: `npx prisma service list --branch <git-branch> --json`.
- Deleting the Git branch removes the preview's services, databases, and buckets. Production and the default branch are never torn down.

## Bad

Running `npx prisma git connect`, pushing, and reporting the app as deployed. The connection alone builds and deploys nothing.

## Good

Connect, commit `.github/workflows/prisma-deploy.yml`, push a non-default branch first, confirm the run's `url` responds, and only then merge to the default branch with the user's go-ahead.

## References

- [Deploy on push](https://www.prisma.io/docs/compute/deploy-on-push)
- [GitHub integration](https://www.prisma.io/docs/compute/github)
- [prisma/cloud-deploy-action](https://github.com/prisma/cloud-deploy-action)
