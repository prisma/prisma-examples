### 2. Setup PostgreSQL

- The recommended way of trying this out would be using a Docker image of PostgreSQL with Postgis extensions that can be pulled from [here](https://github.com/postgis/docker-postgis).

- A [docker-compose.yml](./docker-compose.yml) is included for a quick start so that you do not need any prior setup. Just run `docker-compose up -d` and Postgres will be up and running on PORT 5432 with username **postgres**.

- Connect to Postgres by any database viewer of your choice and run the following command:

```sql
create database geoexample;
```

- Rename the `.env.example` to `.env` and replace the *DBNAME* placeholder with the database name `geoexample` created in the above step.

Run the following command to create the tables and the function required for this example.

```
npm run seed
```

- Lastly run the following commands to introspect the database and generate Prisma Client.

```
npm run prisma -- introspect
npm run prisma -- generate
```

__*Limitation*__: Currently Prisma doesn't support custom data types, so querying for the *geography* type in the normal Prisma models is not possible. Operations can only be performed on the types via `prisma.queryRaw` or `prisma.executeRaw`.
