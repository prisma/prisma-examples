npm install
```

### 2. Generate Prisma Client JS

Prisma Client provides an API that's tailored to your database schema. Generate it with this CLI command:

```
npx prisma2 generate
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

This generates Prisma Client JS into `node_modules/@prisma/client`.