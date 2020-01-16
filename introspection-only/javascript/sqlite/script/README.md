# Simple Node.js Script Example

This example shows how to use [Prisma Client JS](https://photonjs.prisma.io/) in a **simple Node.js script** to read and write data in a SQLite database. You can find the database file with some dummy data at [`./db/dev.db`](./db/dev.db).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git
```

Install npm dependencies:

```
cd prisma-examples/introspection-only/javascript/sqlite/script
npm install
```

### 2. Generate Prisma Client JS

Prisma Client provides an API that's tailored to your database schema. Generate it with this CLI command:

```
npx prisma2 generate
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

This generates Prisma Client JS into `node_modules/@prisma/client`.

### 4. Run the script

Execute the script with this command: 

```
npm run dev
```

## Next steps

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2) (e.g. for [data modeling](https://github.com/prisma/prisma2/blob/master/docs/data-modeling.md), [relations](https://github.com/prisma/prisma2/blob/master/docs/relations.md) or the [Photon.js API](https://github.com/prisma/prisma2/blob/master/docs/photon/api.md))
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track the Prisma Framework's progress on [`isprisma2ready.com`](https://isprisma2ready.com)