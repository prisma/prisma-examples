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

Prisma supports [other databases](https://github.com/prisma/prisma2/blob/master/docs/supported-databases.md). If you would like to connect to your own database, you can do so by specifying a different data source in the [Prisma schema file](prisma/schema.prisma):

```
datasource db {
    provider = "DATABASE_PROVIDER"
    url      = "DATABASE_PROVIDER://USERNAME:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA_FILE_NAME"
    default  = true
}
```

Then to migrate your database, run:

```sh
prisma2 lift save --name 'init'
prisma2 lift up
```
</Details>

### 4. Generate Photon (type-safe database client)

Run the following command to generate [Photon JS](https://photonjs.prisma.io/):

```
prisma2 generate
```

Now you can seed your database using the `seed` script from `package.json`:

```
npm run seed
```
