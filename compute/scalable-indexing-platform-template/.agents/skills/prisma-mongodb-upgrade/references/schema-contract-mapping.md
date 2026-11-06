# schema-contract-mapping

How v6 MongoDB schema concepts map onto Prisma 8's contract model.

## Priority

HIGH

## Why It Matters

Prisma 8 describes the database with a *contract* (authored in PSL or TypeScript), and
several v6 MongoDB idioms have different equivalents. Translating mechanically without
knowing the mapping produces contracts that fail `contract emit` or verification, or that
silently change collection addressing.

## Start without porting

Prisma 8 can read the v6 `schema.prisma` directly: set
`contract: prisma6Schema('prisma/schema.prisma')` in `prisma.config.ts`, with `prisma6Schema`
from `@prisma/orm-mongo/config`. v6 keeps owning the database; after each schema change there,
run `prisma contract emit` and `prisma db sign`. A construct Prisma 8 cannot express fails
`contract emit` with a `PSL.PRISMA6_MONGO_*` diagnostic. Port the schema to a contract when
you need what v6 syntax cannot express, such as polymorphism.

## The mapping

| v6 concept | Prisma 8 equivalent | Notes |
|------------|------------------------|-------|
| (nothing) | `// use prisma-8` as the first line of `contract.prisma` | Without it, `contract emit` fails with `CONTRACT.SOURCE_LOAD_FAILED` |
| `datasource db { provider = "mongodb" }` + `url = env(...)` ([v6 docs](https://www.prisma.io/docs/orm/overview/databases/mongodb#example)) | No provider in the contract. `prisma.config.ts` wraps `defineConfig` from `@prisma/orm-mongo/config` in `definePrismaConfig`, with `db.connection` | `prisma orm init --target mongodb` scaffolds it; point the connection at the same database v6 uses |
| `id String @id @default(auto()) @map("_id") @db.ObjectId` ([using ObjectId](https://www.prisma.io/docs/orm/overview/databases/mongodb#using-objectid)) | `id ObjectId @id @map("_id")` | |
| `Int`, `Float`, `Boolean`, `DateTime` | `Int32`, `Double`, `Bool`, `Date` | The v6 names still work with a `PSL_DEPRECATED_SCALAR_NAME` warning; a later release removes them |
| `BigInt`, `Decimal`, `Bytes`, `Json` | `Int64`, `Decimal128`, `Binary`, `Json` | `Json` holds only JSON values; type a field that holds other BSON values, such as a `Date`, as `Bson` |
| `@default(now())`, `@updatedAt` | `temporal.createdAt()`, `temporal.updatedAt()` | |
| Composite types: `type Address { ... }` ([composite types](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types)) | `type Address { ... }` | Unchanged |
| Enums read and written by key | Enums read and write their **storage value** (`role: 'author'`, not `'Author'`) | Declare the storage value in the enum, for example `Author = "author"` |
| Model names address the client (`prisma.user`) | **Collection names** address the ORM: `db.orm.users` — the `@@map(...)` value, or the model name exactly as written when there is no `@@map`. `db.orm.User` does not exist for a model mapped to `users` | The most common porting mistake |
| Indexes declared in schema, applied by `db push` | `@@index(...)` / `@@unique(...)` in the contract, applied by migrations | See `migrations-mapping.md` |
| No native polymorphism | `@@discriminator(field)` on the base model and `@@base(Base, "value")` on each variant | Declare a variant for **every** value the field has in existing data: the generated validator rejects writes to documents with an undeclared value. A variant must declare at least one field |

## Bad

```typescript
// Ported from v6 and addressed by model name:
const user = await db.orm.User.where({ email }).first(); // no such key — the collection is mapped to "users"
```

## Good

```typescript
// Mongo ORM keys are collection names (@@map value, or the model name as written):
const user = await db.orm.users.where({ email }).first();
```

## Environment requirements

Prisma 8 on MongoDB requires MongoDB 8.0+ and `mongodb@7` as a peer dependency. v6 supports
older MongoDB servers, so check the server version before planning a migration.

## References

- [Prisma ORM 6 to 8 (MongoDB) guide, step 2](https://www.prisma.io/docs/guides/upgrade-prisma-orm/mongodb#2-port-the-schema-to-a-contract)
- [v6 MongoDB schema documentation](https://www.prisma.io/docs/orm/overview/databases/mongodb)
- [v6 composite types (MongoDB-only)](https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/composite-types)
- The `prisma-8` skill's `references/contract.md` — authoritative for the Prisma 8 side
