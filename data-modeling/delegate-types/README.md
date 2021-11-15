# Data modeling: Delegate types

This example shows you how to model [delegate types](https://edgeapi.rubyonrails.org/classes/ActiveRecord/DelegatedType.html) using Prisma, and use [Prisma Client](https://www.prisma.io/client) in a **Node.js script** to read and write data.

This example consists of a `script.ts` file that contains example Prisma Client queries for delegate types


## What are Delegate types?

TODO?

## How to use

Download this example:

```
curl https://codeload.github.com/prisma/prisma-examples/tar.gz/latest | tar -xz --strip=2 prisma-examples-latest/data-modeling/delegate-types
```

Install npm dependencies:
```
cd delegate-types
npm install
```

<details><summary><strong>Alternative:</strong> Clone the entire repo</summary>

Clone this repository:

```
git clone git@github.com:prisma/prisma-examples.git --depth=1
```

Install npm dependencies:

```
cd prisma-examples/data-modeling/delegate-types
npm install
```
</details>

### 2. Create and seed the database

Run the following command to create your SQLite database file. This also creates the `Content`, `Video`, `Image` and `Article` tables that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

Now, seed the database with the sample data in [`prisma/seed.ts`](./prisma/seed.ts) by running the following command:

```
npx prisma db seed 
```

### 3. Run the script

To run the script `script.ts`, run the following command: 

```bash
npm run dev
```

As a next step, explore the `script.ts` file to see how to use Prisma Client to read and write data in the database.