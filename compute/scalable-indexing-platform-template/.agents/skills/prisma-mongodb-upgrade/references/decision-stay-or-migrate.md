# decision-stay-or-migrate

How to decide between migrating a MongoDB project to Prisma 8 and staying on Prisma v6.

## Priority

CRITICAL

## Why It Matters

MongoDB projects cannot follow the general "upgrade Prisma" advice: Prisma 7 has no MongoDB
connector, so the forward path is Prisma 8. Advising an impossible v7 upgrade, or
silently rewriting the app onto SQL, are both serious failure modes. The encouraged path is
migrating to Prisma 8 — its MongoDB support is Early Access and the Prisma team wants
early adopters' feedback — with a deliberate stay on v6 where a hard blocker applies.

## The facts the decision rests on

Prisma 8 side ([supported databases](https://www.prisma.io/docs/orm/supported-databases),
[6 to 8 MongoDB guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb)):

- **MongoDB support is Early Access** in `@prisma/orm-mongo`; PostgreSQL is a release
  candidate.
- The implementation is not a stub: an ORM client, a typed aggregation-pipeline builder, a
  raw lane, and first-class contract-driven migrations.
- **Prisma 8 has no MongoDB transaction method yet** — there is no `db.transaction(...)` on
  the MongoDB client. Multi-document atomicity uses the `mongodb` driver's session API on a
  replica set. This skill will be updated when a transaction method ships.
- Early Access means MongoDB behavior can change between release candidates. Floor:
  Node.js 22.18+, TypeScript 5.9+, MongoDB 8.0+, and `mongodb@7`.

Prisma v6 side:

- v6 fully supports MongoDB, including transactions on replica sets — "MongoDB only allows
  you to start a transaction on a replica set. Prisma ORM uses transactions internally"
  ([replica set configuration](https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration)).
- v6 MongoDB has no Prisma Migrate; the workflow is `db push`
  ([no support for Prisma Migrate](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)).

## Blocker checks before migrating

Run these checks yourself — from the codebase, not by asking the user:

- **Search the codebase for `$transaction` usage** (grep for `$transaction`). If present,
  plan the raw-driver session equivalents before migrating (see `client-api-mapping.md`) —
  or stay on v6 until Prisma 8 adds a MongoDB transaction method.
- **Check the MongoDB server version** (must be 8.0+ for Prisma 8; v6 tolerated older).
- **Confirm the team can absorb changes between release candidates.** Someone has to
  follow the release notes and update the code. For a production app, confirm the user accepts
  Early Access status before migrating.

## Bad

```text
User: "We're on Prisma 6 with MongoDB. Should we upgrade to Prisma 7?"
Agent: "Yes — here's the v7 upgrade guide. Step 1: install a driver adapter..."
```

Prisma 7 has no MongoDB connector; this migration is impossible and the SQL driver-adapter
steps corrupt a working v6 setup.

## Good

```text
User: "We're on Prisma 6 with MongoDB. Should we upgrade to Prisma 7?"
Agent: "Prisma 7 does not support MongoDB — v6 is the last classic-ORM
major for MongoDB. The path forward is Prisma 8, the successor: its MongoDB support is
Early Access and migrating is encouraged. Let me check the codebase for blockers first —
searching for $transaction usage and checking the MongoDB server version..."
```

## Stay-on-v6 hygiene

Staying is a decision, not a default-by-neglect:

- Pin `prisma` and `@prisma/client` to the latest 6.x and keep taking 6.x patches.
- Watch Prisma release notes and security advisories for the 6.x maintenance line.
- Keep the classic setup (`url = env("DATABASE_URL")` in the schema; `db push`; no SQL
  driver adapters).
- Re-evaluate when Prisma 8's MongoDB support leaves Early Access, or when the blockers are resolved.

## References

- [Prisma ORM 6 to 8 (MongoDB) guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb)
- [Prisma 8 supported databases](https://www.prisma.io/docs/orm/supported-databases)
- [Prisma v6 MongoDB documentation](https://www.prisma.io/docs/orm/overview/databases/mongodb)
