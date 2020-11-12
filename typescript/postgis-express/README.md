# Postgres Geolocation example

This example shows how to implement **Geolocation in PostgreSQL** using [Express](https://expressjs.com/), [Postgis](http://postgis.net/) and [Prisma Client](https://github.com/prisma/prisma2/blob/master/docs/prisma-client-js/api.md).

## How to use

### 1. Download example & install dependencies

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/typescript/postgis-express
npm install
```

Note that this also generates Prisma Client JS into `node_modules/@prisma/client` via a `postinstall` hook of the `@prisma/client` package from your `package.json`.

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


### 3. Start the REST API server

Execute this command to start the server:

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can send the API requests implemented in [index.ts`](./src/index.ts)

## Using the API

You can access the API using the following endpoints:

### `POST`

- `/user`: Create a new User
  - Body:
    - `name: String` (required): The name of the user
    - `location: Object` (required): The location object specified via `lat` and `lng`
      - `lat: Number` (required): The latitude of the user's location
      - `lng: Number` (required): The longitude of the user's location
- `/location`: Create a new Location
  - Body:
    - `name: String` (required): The name of the location
    - `location: Object` (required): The location object specified via `lat` and `lng`
      - `lat: Number` (required): The latitude of the given location
      - `lng: Number` (required): The longitude of the given location

### `GET`

- `/:userId/nearby-places?d={d}`: Fetch locations within the specified radius of the user's location
  - Params:
    - `userId: String` (required): The id of the user
  - Query Params:
    - `d: String` (optional): The distance in kms. Default is *5*


### Seeding data

Add data of your choice to the "User" and "Location" tables with the above endpoints and then run the `GET` endpoint passing the required parameters.
