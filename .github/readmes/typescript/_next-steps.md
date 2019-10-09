
## Next steps

### Use Lift to persists the schema migration

The migrations that were generated throughout the development mode are _development migrations_ that are thrown away once the desired schema has been found. In that case, you need to persists the schema using the Prisma Framework CLI's `lift` subcommands.

To persist your schema migration with Lift, run:

```
npx prisma2 lift save --name 'init'
npx prisma2 lift up
```

The first command saves a number of migration files on te file sytem to store details about the migration, this doesn't yet affect the database. The second command, `lift up`, actually performs the schema migration against the database.

### Generate Photon.js with the CLI

Sometimes, e.g. in CI/CD environments, it can be helpful to generate Photon.js with a CLI command. This can be done with the `prisma2 generate command`. If you want to run it in this project, you need to prepend `npx` again:

```
npx prisma2 generate
```

### More things to explore

- Read the holistic, step-by-step [Prisma Framework tutorial](https://github.com/prisma/prisma2/blob/master/docs/tutorial.md)
- Check out the [Prisma Framework docs](https://github.com/prisma/prisma2)
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma2/)
- Track the Prisma Framework's progress on [`isprisma2ready.com`](https://isprisma2ready.com)