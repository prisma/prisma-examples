---
name: prisma-mongodb-upgrade
description: Decision and migration guide for Prisma ORM MongoDB projects on v6, which have no upgrade path to v7. Use when a MongoDB project asks about upgrading Prisma, when "upgrade to prisma 7" comes up in a project with provider = "mongodb", or when evaluating a move to Prisma 8. Triggers on "upgrade prisma mongodb", "prisma 7 mongodb", "mongodb prisma migration", "prisma 8 mongodb".
license: MIT
metadata:
  author: prisma
  version: "0.2.0"
---

# Prisma MongoDB Upgrade Path

MongoDB projects are the one Prisma cohort with no road into Prisma 7: **v6 is the terminal
classic-ORM major for MongoDB, and v7 never ships a MongoDB connector**. The successor path
is Prisma 8, where MongoDB support is in [Early Access](https://www.prisma.io/docs/orm/supported-databases)
while PostgreSQL is a release candidate. The official
[Prisma ORM 6 to 8 (MongoDB) guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb)
is the source of truth for the migration steps. This skill frames the real decision — migrate to
Prisma 8 (the encouraged path), or stay on v6 where a hard blocker applies — and carries
the migration mechanics.

**Never do either of these:**

- Never advise a MongoDB project to "upgrade to Prisma 7". The connector does not exist
  there. The `prisma-upgrade-v7` guide does not apply to MongoDB projects.
- Never solve the version question by rewriting the app onto a SQL database. Changing the
  database engine is a separate, much larger decision that is not yours to make implicitly.

## The version landscape

| Version | MongoDB status |
|---------|----------------|
| Prisma ORM v6 | Fully supported (`mongodb` provider); latest 6.x is the current stable path; maintenance line |
| Prisma ORM v7 | **No MongoDB connector — not an option, ever** |
| Prisma 8 | MongoDB support in **Early Access** through `@prisma/orm-mongo`; still changes between release candidates — the successor path for MongoDB projects |

## The decision, up front

**Migrating to Prisma 8 is the encouraged path.** MongoDB support in Prisma 8 is Early
Access: functional and moving quickly — and the Prisma team wants MongoDB users to migrate
early and share feedback. The migration mechanics are
detailed in the references.

**Staying on the latest v6 remains a legitimate choice where a hard blocker applies** —
stated plainly: Prisma 8 has no MongoDB transaction method yet (multi-document writes use
the `mongodb` driver's sessions directly), and MongoDB behavior can still change between
Prisma 8 release candidates.

### Decision table

| Signal | Direction |
|--------|-----------|
| No blockers below apply | Migrate to Prisma 8; run the `verify-cutover-checklist` and share feedback with the Prisma team |
| Greenfield / prototype / internal tool | Migrate to Prisma 8 |
| Codebase uses multi-document transactions (`$transaction`) — check with grep, do not ask | Plan raw-driver session equivalents first (see `client-api-mapping`), or stay on v6 until Prisma 8 adds a MongoDB transaction method |
| Team cannot absorb breaking changes between release candidates | Stay on v6 until MongoDB support leaves Early Access |
| Risk-averse but interested | Point Prisma 8 at the v6 schema with `prisma6Schema(...)` (see `schema-contract-mapping`), rehearse on a copy (see `verify-cutover-checklist`), then migrate |

Note: this section will be updated when Prisma 8 adds a MongoDB transaction method.

### If staying on v6: hygiene (a deliberate stay, not neglect)

- Pin the Prisma packages to the latest 6.x line and keep taking 6.x patch releases.
- Track Prisma release notes and security advisories for the 6.x line.
- Keep the classic v6 MongoDB setup: `url = env("DATABASE_URL")` in the schema, `db push`
  workflow, no SQL driver adapters (see [`prisma-orm-setup`](../prisma-orm-setup/references/v6-mongodb.md) for the v6 MongoDB shape).
- Re-evaluate when Prisma 8's MongoDB support leaves Early Access, or when the blockers are resolved.

## Reference files

| Reference | What it covers |
|-----------|----------------|
| `references/decision-stay-or-migrate.md` | The full decision framing, blocker checks, and stay-hygiene detail |
| `references/schema-contract-mapping.md` | v6 schema (`mongodb` provider, `@db.ObjectId`, composite types) → Prisma 8 contract concepts |
| `references/client-api-mapping.md` | v6 client calls → Prisma 8 equivalents, incl. raw escape hatches and transactions — names map, parity does not |
| `references/migrations-mapping.md` | v6 `db push`-only story → Prisma 8's plan/migrate/verify/sign flow |
| `references/verify-cutover-checklist.md` | No-data-moves verification: same DB, index parity, staged round-trip before cutover |

## Verified against

Prisma 8 claims in this skill were checked against the
[Prisma ORM 6 to 8 (MongoDB) guide](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb),
written for `@prisma/orm-mongo` 8.0.0-rc.13, and the `prisma-8` skill in
[prisma/orm](https://github.com/prisma/orm/tree/main/skills/prisma-8) at commit
`75c1460515fa2f11971533f6a1dec5dab35d4123`. MongoDB support still changes between release
candidates: **before acting on any Prisma 8 claim, check the installed version**
(`npm ls @prisma/orm-mongo`) and its synced `prisma-8` skill.

Prisma 8 on MongoDB requires Node.js 22.18+ (24.11+ on the 24 line; 24 recommended),
TypeScript 5.9+, MongoDB 8.0+, and `mongodb@7` as a peer dependency. The `mongodb@7` driver
no longer accepts AWS credentials in the connection string.

## Hand-off rule

This skill is the **discovery bridge**, not a replacement for Prisma 8's own
documentation. After a project switches to Prisma 8, run `prisma skills sync`, read the
synced `prisma-8/SKILL.md`, and follow it for day-to-day work — do not keep working from
this skill's summaries.
