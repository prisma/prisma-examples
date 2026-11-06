# Console and programmatic operations

Read this only for work beyond connecting one application.

## Console and database operations

Use [Prisma Console](https://console.prisma.io) to inspect the selected project and open its database in Studio. Use links returned by the API or UI rather than constructing Console URLs from guessed ID formats.

For usage, backups, connections, or restoration, inspect current Platform CLI help or the [Management API schema](https://api.prisma.io/v1/doc). Resolve resource IDs before acting. Database deletion, restoration, and credential revocation are separate actions requiring the user's authorization; they are not routine setup steps.

## Management API SDK

Use `@prisma/management-api-sdk` for a typed API integration. Its installed types define current routes and request/response shapes independently of ORM versions.

- `createManagementApiClient({ token })` uses an existing token. Check HTTP errors before reading response data and follow pagination on collection routes.
- `createManagementApiSdk(...)` supports OAuth and token refresh. Implement persistent, protected token storage; do not copy a no-op storage example into an application.
- In the OAuth flow, persist and validate state and the verifier, handle the callback, and store refreshed tokens securely.
- Service-token and connection creation can return credentials once. Save them to the intended secret store without logging the response. Listing token metadata does not recover the original value.

For exact interfaces and a complete integration, use the [SDK documentation](https://www.prisma.io/docs/postgres/introduction/management-api-sdk) and installed package types. Keep ORM schema and migration work in the version-matched ORM skill.
