# client-api-mapping

How v6 Prisma Client calls map to Prisma 8's Mongo client — names map, parity does not.

## Priority

CRITICAL

## Why It Matters

The v6 and Prisma 8 client APIs look superficially similar, but none of the v6 MongoDB raw
methods exist under their old names, aggregation moved to a different lane entirely, and
transactions go through the driver rather than a Prisma method. Assuming parity produces
code that does not compile — or, in the transactions case, code that silently loses
atomicity.

## The mapping

| v6 call | Prisma 8 equivalent | Notes |
|---------|------------------------|-------|
| `prisma.user.findMany(...)` | `db.orm.users.where({ ... }).all()` | Chained API; collection-name keys (see `schema-contract-mapping.md`) |
| `prisma.user.findFirst(...)` | `db.orm.users.where({ ... }).first()` | `.where(...)` takes a plain equality object, not `{ equals: ... }` |
| `create` / `update` / `upsert` / `delete` | Same names on `db.orm.<collection>` | Every mutation except `create` needs a `.where(...)` first |
| `updateMany` / `deleteMany` | `updateAll` / `deleteAll` | |
| `prisma.user.aggregate(...)`, `groupBy(...)` | **No ORM equivalent.** Build a plan with `db.query.from(...).group(...).build()` and run it with `(await db.runtime()).query(plan)` | Group totals come from `acc` in `@prisma/orm-mongo/query-builder` |
| `<model>.findRaw(...)`, `<model>.aggregateRaw(...)` ([v6 docs](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#findraw)) | `db.raw.collection('<name>').aggregate([...]).build()`, or `db.query.rawCommand(...)` | Run the plan with `(await db.runtime()).query(plan)` |
| `$runCommandRaw(...)` ([v6 docs](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#runcommandraw)) | **No Prisma equivalent.** Create a `MongoClient`, pass it to the `mongo(...)` binding as `mongoClient`, and call `mongoClient.db(...).command(...)` | `db.raw` is collection-scoped; database-level commands go through the driver |
| `$transaction(...)` — works on v6 with a replica set ([v6 docs](https://www.prisma.io/docs/orm/overview/databases/mongodb#replica-set-configuration)) | **No Prisma method yet.** Use `mongodb` driver sessions (`client.startSession()` / `session.withTransaction(...)`) on a replica set | Pass `{ session }` to every operation; an operation without it runs outside the transaction |
| `$connect` / `$disconnect` | Connects lazily on first use; `db.close()` disconnects | |

**ObjectId filters in the pipeline builder:** `.match((f) => f.authorId.eq(authorId))` sends
the id as a plain string and matches nothing. Filter ObjectId fields through the ORM client
(`db.orm.posts.where({ authorId })`), or use `db.query.rawCommand(...)` with a real
`ObjectId`.

## Bad

```typescript
// Assuming v6 names exist in Prisma 8:
await db.users.$runCommandRaw({ collStats: 'users' }); // no such method
await db.transaction(async (tx) => { ... });          // no such method on the MongoDB client
```

## Good

```typescript
import { acc } from '@prisma/orm-mongo/query-builder';

// Aggregation through the typed pipeline builder:
const plan = db.query
  .from('users')
  .group((f) => ({ _id: f.role, n: acc.count() }))
  .build();
const byRole = await (await db.runtime()).query(plan).toArray();

// Database-level commands through the MongoClient shared with the binding:
await mongoClient.db('my-app-db').command({ ping: 1 });

// Multi-document atomicity through a driver session:
const session = mongoClient.startSession();
try {
  await session.withTransaction(async () => {
    // ...writes, each with { session }...
  });
} finally {
  await session.endSession();
}
```

## References

- [Prisma ORM 6 to 8 (MongoDB) guide, step 3](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb#3-port-client-calls)
- [Prisma 8 transactions on MongoDB](https://www.prisma.io/docs/orm/fundamentals/transactions#transactions-on-mongodb)
- [v6 MongoDB raw queries](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql/raw-queries#raw-queries-with-mongodb)
- The `prisma-8` skill's `references/queries-mongo.md` — authoritative for the Prisma 8 side
