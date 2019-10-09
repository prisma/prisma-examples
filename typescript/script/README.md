# Simple TypeScript Script Example

This example shows how to use [Photon.js](https://photonjs.prisma.io/) in a **simple TypeScript script** to read and write data in a database.

## How to use

### 1. Download example & install dependencies

Clone the `prisma2` branch of this repository:

```
git clone --single-branch --branch prisma2 git@github.com:prisma/prisma-examples.git
```

Install Node dependencies:

```
cd prisma-examples/typescript/script
npm install
```

### 2. Run Prisma's development mode

<Details><Summary>Learn more about the development mode</Summary>

Prisma's [development mode](https://github.com/prisma/prisma2/blob/master/docs/development-mode.md) watches your [Prisma schema](https://github.com/prisma/prisma2/blob/master/docs/prisma-schema-file.md) on the file system. Whenever there's a change in the schema, the Prisma Framework CLI performs two major tasks in the background:

- map the Prisma schema to your database schema (i.e., perform a schema migration in the database) 
- regenerate the Photon.js database client based on the new Prisma schema

It also runs a web server to host [Prisma Studio](https://github.com/prisma/studio), typically at [`http://localhost:5555`](http://localhost:5555).

In this case, the command also creates a new [SQLite database](https://www.sqlite.org/index.html) file at `./prisma/dev.db` since that didn't exist in the project yet.

</Details>

Start the development mode with the following command:

```
npx prisma2 dev
```

> **Note**: You're using [npx](https://github.com/npm/npx) to run the Prisma Framework CLI that's listed as a development dependency in [`package.json`](./package.json). Alternatively, you can install the CLI globally using `npm install -g prisma2`. When using Yarn, you can run: `yarn prisma2 dev`.

You can now open [Prisma Studio](https://github.com/prisma/studio), open your browsers and navigate to the the URL displayed by the CLI output (typically at [`http://localhost:5555`](http://localhost:5555)).

You can also use the [SQLite Browser](https://sqlitebrowser.org/) to view and edit your data in the `./prisma/dev.db` file that was created when you ran `prisma2 dev`.

<Details>
<Summary><b>Alternative: </b>Connect to your own database</Summary>

Prisma supports MySQL and PostgreSQL at the moment. If you would like to connect to your own database, you can do so by specifying a different data source in the [Prisma schema file](prisma/schema.prisma).

For a MySQL provider:
```
datasource mysql {
    provider = "mysql"
    url      = "mysql://johndoe:secret42@localhost:3306/mydatabase"
}
```

*OR*

For a PostgreSQL provider:
```
datasource postgresql {
  provider = "postgresql"
  url      = "postgresql://johndoe:secret42@localhost:5432/mydatabase?schema=public"
}
```

> Note: In the above example connection strings, `johndoe` would be the username to your database, `secret42` the password, `mydatabase` the name of your database, and `public` the [PostgreSQL schema](https://www.postgresql.org/docs/9.1/ddl-schemas.html). 

Then to migrate your database, run:

```sh
npx prisma2 lift save --name 'init'
npx prisma2 lift up
```

</Details>

<!-- <Details>
<Summary><b>Alternative: </b>Use CLI commands for the schema migration and Photon.js generation</Summary> -->

Instead of using the development mode, you can also perform a schema migration using Lift, and generate Photon.js with a dedicated CLI command (learn more [below](#next-steps)).

<!-- </Details> -->

### 3. Prepare and launch the application

The `seed` script from `package.json` contains some code to seed the database with test data. Execute it with the following command:

```
npm run seed
```


### 4. Run the script

Execute the script with this command: 

```
npm run start
```


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