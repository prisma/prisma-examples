# Simple TypeScript Script Example

This example shows how to use [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) in a **simple TypeScript script** to read and write data in a SQLite database. You can find the database file with some dummy data at [`./prisma/dev.db`](./prisma/dev.db).

__INLINE(../_setup-0.md)__
npx try-prisma@latest --template orm/script
__INLINE(../_setup-1.md)__
cd script
__INLINE(../_setup-2.md)__
cd prisma-examples/orm/script
__INLINE(../_setup-2_script.md)__

### 3. Run the script

Execute the script with this command:

```
npm run dev
```

__INLINE(../_evolving-the-app.md)__

__INLINE(../../_switching-databases.md)__

__INLINE(../../_next-steps.md)__
