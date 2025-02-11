# Prisma with Turso Example

This example demonstrates how to use [Prisma ORM](https://www.prisma.io/) with [Turso](https://turso.tech/), a distributed database based on libSQL. The project showcases how to perform CRUD operations using [Prisma Client](https://www.prisma.io/docs/orm/prisma-client) in a **Node.js script**.

## How to use

### 1. Download example and navigate into the project directory

Download this example:

```
npx try-prisma@latest --template databases/turso
```

Then, navigate into the project directory:

```
cd turso
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

### 2. Install npm dependencies:

```
cd prisma-examples/databases/turso
npm install
```

</details>

### 3. Configure the database connection
Create a .env file in the root of the project and add your Turso credentials:
```sh
touch .env
```
If you don't have an existing database, you can provision a database by running the following command:
```sh
turso db create turso-prisma-db
```
The above command will create a database in the closest region to your location.

Run the following command to retrieve your database's connection string:
```sh
turso db show turso-prisma-db
```
Next, create an authentication token that will allow you to connect to the database:
```sh
turso db tokens create turso-prisma-db
```
Update your .env file with the authentication token and connection string:
```sh
TURSO_DATABASE_URL="your_turso_database_url"
TURSO_AUTH_TOKEN="your_turso_auth_token"
```
You can learn more from the [Prisma Turso documentation](https://www.prisma.io/docs/orm/overview/databases/turso#what-is-turso)

### 4. Generate Prisma Client
```sh
npx prisma generate
```
### 5. Run the script
Execute the script to create, retrieve, update, and delete data:
```sh
npm run dev
```
### 6. Understanding the project structure
- `prisma/schema.prisma`: Defines the database schema for Users and Posts.
- `src/script.ts`: A script demonstrating CRUD operations using Prisma Client.
- `.env`: Stores environment variables for database credentials.
