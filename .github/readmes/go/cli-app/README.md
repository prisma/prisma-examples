# Simple TODO-App Example (CLI)

This example shows how to implement a **TODO-app as a CLI tool** with Golang and Prisma.

__INLINE(../_setup-1.md)__
cd prisma-examples/go/cli-app
__INLINE(../_setup-2.md)__

### 4. Use the CLI app

```
go run main.go
```

#### Add a `Todo` item

```
go run main.go create Groceries
```

#### List all `Todo` items

```
go run main.go list
```

#### Delete a `Todo` item

```
go run main.go delete Groceries
```

__INLINE(../_next-steps.md)__