cd prisma-examples/orm/postgis-express
npm install
```

</details>

### 2. Setup PostgreSQL

- The recommended way of trying this out would be using a Docker image of PostgreSQL with Postgis extensions that can be pulled from [here](https://github.com/postgis/docker-postgis).

- A [docker-compose.yml](./docker-compose.yml) is included for a quick start so that you do not need any prior setup. Just run `docker-compose up -d` and Postgres will be up and running on PORT 5432 with username **postgres** and database **geoexample**.

- Connect to Postgres by any database viewer of your choice.

- Rename the `.env.example` to `.env` and replace the _DBNAME_ placeholder with the database name `geoexample` created in the above step.

Run the following command to create the tables and the function required for this example.

```
npx prisma migrate deploy
```

- Lastly run the following command to generate Prisma Client.

```
npx prisma generate
```

**_Limitation_**: Currently Prisma doesn't support custom data types, so querying for the _geography_ type in the normal Prisma models is not possible. Operations can only be performed on the types via `prisma.$queryRaw` or `prisma.$executeRaw`. You can learn more about unsupported types [here](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#unsupported).
