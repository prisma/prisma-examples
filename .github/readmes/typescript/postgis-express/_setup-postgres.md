### 2. Setup Postgres

- The recommended way of trying this out would be using a Docker image of Postgres + Postgis that can be pulled from [here](https://github.com/postgis/docker-postgis).

- Connect to Postgres by any database viewer of your choice and run the following command:

```sql
create database geoexample;
```

- Rename the `.env.example` to `.env` and specify the necessary credentials. The *DBNAME* placeholder should be replaced with the database created in the above step.

Run the following command to create the tables and the function required for this example.

```
npm run seed
```

- Lastly run the following commands to introspect the database and generate Prisma Client.

```
npm run prisma -- introspect
npm run prisma -- generate
```

__*Limitation*__: Currently Prisma doesn't support custom data types so querying for the *geography* type is not possible. Only operations can be performed on the types via `prisma.queryRaw` or `prisma.executeRaw`.
