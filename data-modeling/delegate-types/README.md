# Data modeling: Delegate types

This example shows you how to model [delegate types](https://edgeapi.rubyonrails.org/classes/ActiveRecord/DelegatedType.html) using Prisma, and use [Prisma Client](https://www.prisma.io/client) in a **TypeScript script** to read and write data.

This example consists of a `script.ts` file that contains example Prisma Client queries for delegate types


## What are Delegate types?

An application such as LinkedIn contains a feed that would contain different types of content such as articles, images, and videos. In such an instance, you would have a *parent entity*, `Feed`, containing all the shared properties and *child entities*,`Article`, `Image`, and `Video`, that inherit the *parent entity*'s properties and have their individual properties. 

When querying feed data, you would only query the feed data instead of querying the `Article`, `Image`, and `Video` tables and then merging them into one response. Querying and merging responses from the individual tables wouldn't allow you to perform operations such as ordering and filtering. This is the problem that delegate type solves.

The `Feed` response mimics union types by using delegate types.

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