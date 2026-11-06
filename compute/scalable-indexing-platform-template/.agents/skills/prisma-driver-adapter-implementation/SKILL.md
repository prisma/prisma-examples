---
name: prisma-driver-adapter-implementation
description: Required reference for Prisma ORM 7 SQL driver adapter work. Use when implementing or modifying adapters, adding database drivers, or touching SqlDriverAdapter, Transaction, savepoint, result mapping, or DriverAdapterError behavior. Covers current transaction lifecycle, optional savepoint hooks, original database-error preservation, and verification.
license: MIT
metadata:
  author: prisma
  version: "7.9.1"
---

# Prisma SQL Driver Adapter Implementation

Use this guide with the exact `@prisma/driver-adapter-utils` version installed by the target Prisma release. Driver adapters are a protocol boundary: type-compatible code can still corrupt values, leak connections, or break transactions.

## When to Apply

- Implementing `SqlDriverAdapterFactory`, `SqlMigrationAwareDriverAdapterFactory`, `SqlDriverAdapter`, or `Transaction`
- Adding nested-transaction/savepoint support
- Mapping driver values, column metadata, bind arguments, or database errors
- Debugging `P2039`, transaction leaks, shadow-database failures, or adapter-specific query behavior

## Contract snapshot

```typescript
interface SqlDriverAdapterFactory extends AdapterInfo {
  connect(): Promise<SqlDriverAdapter>
}

interface SqlMigrationAwareDriverAdapterFactory extends SqlDriverAdapterFactory {
  connectToShadowDb(): Promise<SqlDriverAdapter>
}

interface SqlDriverAdapter extends AdapterInfo {
  queryRaw(query: SqlQuery): Promise<SqlResultSet>
  executeRaw(query: SqlQuery): Promise<number>
  executeScript(script: string): Promise<void>
  startTransaction(isolationLevel?: IsolationLevel): Promise<Transaction>
  getConnectionInfo?(): ConnectionInfo
  dispose(): Promise<void>
}

interface Transaction extends AdapterInfo {
  readonly options: { usePhantomQuery: boolean }
  queryRaw(query: SqlQuery): Promise<SqlResultSet>
  executeRaw(query: SqlQuery): Promise<number>
  commit(): Promise<void>
  rollback(): Promise<void>
  createSavepoint?(name: string): Promise<void>
  rollbackToSavepoint?(name: string): Promise<void>
  releaseSavepoint?(name: string): Promise<void>
}
```

`IsolationLevel` currently includes `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SNAPSHOT`, and `SERIALIZABLE`; validate what the concrete database supports.

## Priority rules

| Priority | Rule | Impact |
|----------|------|--------|
| CRITICAL | One dedicated connection per transaction | Prevents interleaving and leaks |
| CRITICAL | `commit`/`rollback` are lifecycle cleanup hooks | Prevents duplicate COMMIT/ROLLBACK |
| CRITICAL | Savepoints live on `Transaction`, not adapter-global depth | Makes nested scopes connection-local |
| CRITICAL | Preserve original database error code/message | Enables useful `P2039` fallback |
| HIGH | Map arguments and result metadata exactly | Prevents silent value corruption |
| HIGH | Shadow databases are isolated and always cleaned up | Makes Migrate safe |
| HIGH | Dispose only resources the adapter owns | Prevents shutting down caller-owned pools |

## Query implementation

`SqlQuery` contains `sql`, `args`, and parallel `argTypes`. Map each argument using both value and `ArgType`; do not discard type/arity information. Execute in the driver's array/tuple row mode so column order is stable.

```typescript
class ExampleQueryable {
  readonly provider = 'postgres' as const
  readonly adapterName = '@acme/adapter-example'

  constructor(protected readonly connection: DriverConnection) {}

  async queryRaw(query: SqlQuery): Promise<SqlResultSet> {
    try {
      const result = await this.connection.query({
        text: query.sql,
        values: query.args.map((value, index) =>
          mapArg(value, query.argTypes[index]),
        ),
        rowMode: 'array',
      })

      return {
        columnNames: result.fields.map((field) => field.name),
        columnTypes: result.fields.map(mapColumnType),
        rows: result.rows,
      }
    } catch (error) {
      throwAdapterError(error)
    }
  }

  async executeRaw(query: SqlQuery): Promise<number> {
    try {
      const result = await this.connection.execute(
        query.sql,
        query.args.map((value, index) => mapArg(value, query.argTypes[index])),
      )
      return result.rowsAffected ?? 0
    } catch (error) {
      throwAdapterError(error)
    }
  }
}
```

### Result mapping

Return `columnNames`, `columnTypes`, and `rows` with identical lengths/order. Map driver metadata to `ColumnTypeEnum` deliberately:

- signed integer widths to `Int32`/`Int64`; preserve 64-bit values without JS number truncation
- decimal/numeric to `Numeric` using the representation expected by Prisma
- binary to `Uint8Array`/`Bytes`
- date-only, time-only, and timestamp to `Date`, `Time`, and `DateTime`
- UUID, JSON, enum, arrays, and provider-specific unknown values to their explicit types
- unsupported native types to `DriverAdapterError({ kind: 'UnsupportedNativeDataType', type })`

Test `null`, empty arrays, array element types, big integers, decimals, byte arrays, JSON, dates, and user-defined/unknown native types.

### Script execution

`executeScript` must execute a migration script as the provider expects. Prefer the driver's native multi-statement/script facility or a real SQL parser. Naively splitting on `;` breaks functions, triggers, quoted strings, and dialect-specific blocks.

## Transaction protocol

`startTransaction` must acquire one dedicated connection, start the database transaction, apply the requested isolation level, and return a `Transaction` bound to that same connection. If setup fails, release it immediately.

```typescript
async startTransaction(level?: IsolationLevel): Promise<Transaction> {
  const connection = await this.pool.acquire()
  try {
    const tx = new ExampleTransaction(connection, () => connection.release())
    await tx.executeRaw({ sql: 'BEGIN', args: [], argTypes: [] })
    if (level) {
      await tx.executeRaw({
        sql: `SET TRANSACTION ISOLATION LEVEL ${validateLevel(level)}`,
        args: [],
        argTypes: [],
      })
    }
    return tx
  } catch (error) {
    connection.release(error)
    throwAdapterError(error)
  }
}
```

### Commit and rollback

Prisma coordinates the SQL `COMMIT`/`ROLLBACK` through `executeRaw`. The transaction object's `commit()` and `rollback()` methods are lifecycle hooks: detach listeners and release the dedicated connection exactly once. They must not issue a second SQL commit/rollback.

```typescript
class ExampleTransaction extends ExampleQueryable implements Transaction {
  readonly options = { usePhantomQuery: false }
  #closed = false

  constructor(connection: DriverConnection, private readonly release: () => void) {
    super(connection)
  }

  async commit() { this.finish() }
  async rollback() { this.finish() }

  private finish() {
    if (this.#closed) return
    this.#closed = true
    this.release()
  }

  async createSavepoint(name: string) {
    await this.control(`SAVEPOINT ${safeSavepoint(name)}`)
  }

  async rollbackToSavepoint(name: string) {
    await this.control(`ROLLBACK TO SAVEPOINT ${safeSavepoint(name)}`)
  }

  async releaseSavepoint(name: string) {
    await this.control(`RELEASE SAVEPOINT ${safeSavepoint(name)}`)
  }

  private async control(sql: string) {
    await this.executeRaw({ sql, args: [], argTypes: [] })
  }
}
```

Implement the optional savepoint methods only where the provider supports them. Validate/quote savepoint identifiers. For providers whose savepoints are intentionally no-ops, document and test that limitation.

Never keep transaction depth on the shared adapter. Parallel transactions make adapter-global depth incorrect; nested state belongs to the returned transaction connection and Prisma's savepoint calls.

## Error mapping

Wrap recognized driver failures in `DriverAdapterError`. Map known conditions to `MappedError` kinds such as constraint violations, authentication/reachability, missing table/column/database, timeouts, closed transactions, invalid input, value range, and write conflicts.

For database errors, preserve `originalCode` and `originalMessage` even when falling back to the provider-specific raw variant:

```typescript
import {
  DriverAdapterError,
  type Error as DriverAdapterErrorObject,
  type MappedError,
} from '@prisma/driver-adapter-utils'

function convertDriverError(error: DatabaseError): DriverAdapterErrorObject {
  return {
    originalCode: String(error.code),
    originalMessage: error.message,
    ...mapKnownOrRaw(error),
  }
}

function mapKnownOrRaw(error: DatabaseError): MappedError {
  if (error.code === '23505') {
    return { kind: 'UniqueConstraintViolation', constraint: parsedConstraint(error) }
  }
  return {
    kind: 'postgres',
    code: String(error.code ?? 'N/A'),
    severity: error.severity ?? 'N/A',
    message: error.message,
    detail: error.detail,
    column: error.column,
    hint: error.hint,
  }
}

function throwAdapterError(error: unknown): never {
  if (!isDatabaseError(error)) throw error
  throw new DriverAdapterError(convertDriverError(error))
}
```

Prisma uses preserved original details when an unmapped driver error becomes `P2039`. Do not replace every unknown exception with a fabricated `GenericJs` id; rethrow genuinely unexpected non-driver errors so programming bugs remain visible.

## Factory, ownership, and shadow database

- `connect()` returns a fresh usable adapter connection/pool wrapper.
- Track whether the factory created the pool. `dispose()` closes owned pools and only detaches listeners from caller-owned pools unless an explicit option transfers ownership.
- Implement `SqlMigrationAwareDriverAdapterFactory` only when `connectToShadowDb()` can create an isolated shadow database, connect to it, and drop it during disposal/failure cleanup.
- Never point the shadow adapter at the primary database. Quote generated identifiers and use cryptographically unique names.
- `getConnectionInfo()` should accurately report `schemaName`, `maxBindValues` when applicable, and `supportsRelationJoins`.

## Verification checklist

- [ ] Typecheck against the exact target `@prisma/driver-adapter-utils` version
- [ ] `queryRaw` preserves column order, types, nulls, and precision
- [ ] `executeRaw` reports affected rows correctly
- [ ] `executeScript` handles provider-specific multi-statement syntax
- [ ] Concurrent interactive transactions use distinct dedicated connections
- [ ] Success commits and releases once; failure rolls back and releases once
- [ ] Nested transaction tests exercise create/rollback/release savepoint hooks
- [ ] Unsupported isolation levels fail as `InvalidIsolationLevel`
- [ ] Known constraints map to structured errors
- [ ] Unmapped database errors retain original code/message and surface useful `P2039`
- [ ] Dispose ownership is tested for internal and external pools
- [ ] Shadow database creation, use, failure cleanup, and disposal are isolated
- [ ] Run Prisma Client integration/E2E tests, not only adapter unit tests

## Source references

- [Driver adapter interfaces](https://github.com/prisma/prisma/blob/v7/packages/driver-adapter-utils/src/types.ts)
- [PostgreSQL adapter transaction implementation](https://github.com/prisma/prisma/blob/v7/packages/adapter-pg/src/pg.ts)
- [PostgreSQL adapter error mapping](https://github.com/prisma/prisma/blob/v7/packages/adapter-pg/src/errors.ts)
