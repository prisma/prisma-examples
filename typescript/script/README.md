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

### 2. Install the Prisma 2 CLI

To run the example, you need the [Prisma 2 CLI](https://github.com/prisma/prisma2/blob/master/docs/prisma-2-cli.md):

```
npm install -g prisma2
```

### 3. Set up database

For this example, you'll use a simple [SQLite database](https://www.sqlite.org/index.html). To set up your database, run:

```
prisma2 lift save --name 'init'
prisma2 lift up
```

You can now use the [SQLite Browser](https://sqlitebrowser.org/) to view and edit your data in the `./prisma/dev.db` file that was created when you ran `prisma2 lift up`.

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
prisma2 lift save --name 'init'
prisma2 lift up
```
</Details>

### 4. Generate Photon (type-safe database client)

Run the following command to generate [Photon.js](https://photonjs.prisma.io/):

```
prisma2 generate
```

Now you can seed your database using the `seed` script from `package.json`:

```
npm run seed
```


### 5. Run the script

Execute the script with this command: 

```
npm run start
```

## Next steps

- Read the [Prisma 2 announcement](https://www.prisma.io/blog/announcing-prisma-2-zq1s745db8i5/)
- Check out the [Prisma 2 docs](https://github.com/prisma/prisma2)
- Share your feedback in the [`prisma2-preview`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the Prisma Slack
