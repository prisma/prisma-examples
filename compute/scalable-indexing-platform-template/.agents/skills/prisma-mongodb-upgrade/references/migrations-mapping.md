# migrations-mapping

How the v6 MongoDB "no migrations" story maps onto Prisma 8's first-class migration flow.

## Priority

HIGH

## Why It Matters

This is the largest workflow change in the migration — in v6, MongoDB explicitly has no
Prisma Migrate, while in Prisma 8 MongoDB participates in the full migration lifecycle.
Teams porting a `db push` habit into Prisma 8 without understanding the plan/verify/sign flow
will fight the tooling or bypass its safety rails.

## v6: `db push` only

MongoDB on v6 has no Prisma Migrate and no plans to add it — "MongoDB projects do not rely
on internal schemas" ([no support for Prisma Migrate](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)).
The workflow is `prisma db push` to sync indexes and unique constraints, with no migration
history on disk.

## Prisma 8: bring the existing database under management

The database already has collections and data, so bootstrap it with `db update`. It diffs the
live database against the contract, applies the difference (strict validators, plus indexes
the contract declares that v6 never created), and signs the database:

```bash
npx prisma contract emit
npx prisma db update --db "$DATABASE_URL" --dry-run
npx prisma db update --db "$DATABASE_URL" --advance-ref db
```

`--advance-ref db` records the result as the `db` ref that later migration plans diff from.

**Do not use `db init` here.** It only applies additive changes, and adding a validator to a
collection with existing documents counts as destructive, so it refuses.

## Prisma 8: every later schema change

```bash
npx prisma contract emit
npx prisma migration plan --name add_posts_indexes
npx prisma db migrate --db "$DATABASE_URL" --advance-ref db
npx prisma db verify --db "$DATABASE_URL"
```

- **Declare, do not hand-write:** indexes and validators live in the contract, and
  `migration plan` derives the operations. Rendered MongoDB migrations import their factories
  (`createCollection`, `validatedCollection`, `setValidation`, `createIndex`, `dropIndex`,
  `collMod`, `dataTransform`) from `@prisma/orm-mongo/target/migration`.
- **Marker storage:** Prisma 8 records the database's contract state in a document in the
  `_prisma_migrations` collection.
- **DDL is not transactional on MongoDB:** an interrupted `db migrate` is resumed by running
  it again. After fixing anything by hand, run `prisma db sign` so the signature matches the
  database.
- **Push-style alternative:** `db update` without a migration plan is the `db push` analogue
  for local experiments. It keeps no history.
- **Validators:** Prisma 8 adds strict `$jsonSchema` validators to each collection by default.
  Once they are live, writes to documents that do not match the contract fail with
  `Document failed validation`.

## Bad

```text
Porting the v6 habit: run `db update` for every change in production, accumulating no
migration history, and hand-editing collections when verification fails.
```

## Good

```text
Bootstrap once with `db update --advance-ref db`. Then emit the contract, plan a migration,
apply it with `db migrate`, and check with `db verify`. Reserve plain `db update` for local
experiments, mirroring how `db push` was used on v6.
```

## References

- [Prisma ORM 6 to 8 (MongoDB) guide, step 4](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb#4-adopt-the-migration-lifecycle)
- [v6: no Prisma Migrate for MongoDB](https://www.prisma.io/docs/orm/overview/databases/mongodb#no-support-for-prisma-migrate)
- The `prisma-8` skill's `references/migrations.md` — authoritative for the Prisma 8 side
