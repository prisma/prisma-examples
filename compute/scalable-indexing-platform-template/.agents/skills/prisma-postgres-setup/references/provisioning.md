# Standalone provisioning

First reuse an existing connection or resource. For v0 or Vercel Marketplace, use the [native integration flow](vercel-marketplace.md) instead.

## Persistent databases

Choose an available authenticated surface: Prisma Console, the Prisma Platform CLI, a connected Prisma MCP server, or the Management API. Reuse existing authentication; do not ask the user to paste tokens into chat.

- **Console:** select the intended workspace and project at [Prisma Console](https://console.prisma.io), then obtain the database's connection details.
- **Platform CLI:** inspect the current command help before mutation. The Platform commands ship in the Prisma 8 CLI (`prisma` 8, also published as `@prisma/cli`); the `postgres` group of a Prisma 7 `prisma` binary only links an existing database. Start with `npx -y @prisma/cli@latest postgres --help`; discover list, create, and connection commands from that version.
- **MCP:** discover available tools and their input schemas. Confirm the workspace and resource context before invoking a provisioning tool. Missing tools or authentication are blockers, not permission to switch accounts.
- **Management API:** use the [current schema](https://api.prisma.io/v1/doc) at `https://api.prisma.io/v1`, or installed SDK types, for exact endpoints and payloads. Do not copy an older project/database response shape blindly.

List available regions and select one consistent with the user's location requirements and application. Resolve the intended workspace, project, and, where required, branch before creating a database. Follow pagination when listing resources. If creation is asynchronous, poll the returned resource until ready with a bounded wait; report a timeout without creating a replacement. Before retrying an ambiguous creation request, check whether it succeeded to avoid duplicates.

Store returned connection credentials immediately in the intended secret environment. Some credentials are shown only once. Select the direct or pooled endpoint appropriate to the chosen driver and runtime; inspect the returned connection details instead of assuming every endpoint is interchangeable.

## Authentication and errors

For server-to-server API access, use a workspace service token from the user's secret environment. If one is needed, direct the user to Workspace Settings → Service Tokens in Console and have them store it locally or in their secret manager. Use the bearer token without logging it. For an integration acting on behalf of users, use OAuth instead; see [operations](operations.md).

| Failure                              | Response                                                                                 |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| Authentication or permission denied  | Explain which authentication or access is missing.                                       |
| Resource not found                   | Verify the resource ID and workspace; do not create a replacement automatically.         |
| Invalid request                      | Check the current schema and selected region.                                            |
| Rate limit or transient read failure | Retry with bounded backoff, honoring retry guidance.                                     |
| Quota exhausted                      | Report the limit and available options.                                                  |

## Temporary databases with create-db

Use `create-db` when the user needs a working database now and has no connection or Prisma account. By default, the database is available for **24 hours** and is automatically deleted if unclaimed. Claim it through the returned claim URL **before its expiry** to keep it; claiming requires a Prisma account. Use the returned expiry as the deadline if a different lifetime was selected. See the [documented lifecycle](https://www.prisma.io/docs/postgres/npx-create-db#claiming-your-database).

Inspect the current commands when selecting a region or a non-default lifetime:

```bash
npx create-db@latest create --help
npx create-db@latest regions --help
```

Choose a supported region and lifetime. Store the connection string and claim URL privately, outside source code and shared logs. Then give the user the claim URL itself and the expiry from the returned lifecycle information: the database is deleted unless they open that URL and claim it. Do not promise persistence until claiming is complete. Avoid flags that print credentials into shared output.

For programmatic provisioning, the `create-db` package exposes `create()` and `regions()`. Check the installed types, handle success and error results, and store returned connection/claim information without logging it. See the [create-db documentation](https://www.prisma.io/docs/postgres/npx-create-db).
