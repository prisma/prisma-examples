# Prisma Compute examples

These examples show Prisma 8 apps deployed to Prisma Compute with Prisma
Composer.

| Example | Description |
| --- | --- |
| [`hono`](./hono) | Hono API on Node.js. |
| [`nextjs`](./nextjs) | Next.js App Router app using standalone output for Prisma Compute. |
| [`tanstack-start`](./tanstack-start) | TanStack Start app using the Nitro Vite plugin output supported by Prisma Compute. |
| [`personal-site`](./personal-site) | Astro personal site with no database. |

## Adding a template

`templates.json` is the manifest behind [prisma.io/apps](https://www.prisma.io/apps).
To list a template there, add a folder under `compute/` with a README and a
Composer module, then add an entry to the manifest and open a pull request:

```json
{
  "id": "my-template",
  "name": "My Template",
  "description": "One sentence on what it is and what it runs on.",
  "path": "compute/my-template",
  "framework": "nextjs",
  "author": {
    "name": "Your name or company",
    "url": "https://github.com/your-handle",
    "logo": "https://example.com/logo.svg"
  }
}
```

`framework` is a lowercase slug such as `nextjs`, `hono`, `tanstack-start` or
`astro`. `author` is who gets credited on the gallery card; leave it out for
templates maintained by Prisma. `logo` is optional and must be an absolute URL.

Each example includes a Composer module and a GitHub Actions deployment
workflow. The database-backed examples also include a Prisma 8 contract,
generated typed client metadata, and seed data.
Deploy the companion Console change before publishing these templates so the
one-click flow can validate and copy their Composer files.

The templates pin the released toolchain as exact versions: the consolidated
`prisma` CLI (8.0.0-rc.6, published on the `next` npm tag until the Prisma 8
cutover) runs every ORM and cloud script, and `@prisma/composer-cli` at the
same version as the `@prisma/composer` libraries provides the local
`prisma-composer` bin, which `prisma/cloud-deploy-action` prefers over its npx
fallback — so deploys run the exact Composer version each app depends on.
These pins can move to stable releases once Prisma 8 reaches general
availability.
