# Prisma Optimize example

This repository demonstrates how to setup and use [Prisma Optimize](https://pris.ly/optimize).

## Prerequisites

To successfully run the project, you will need the following:

1. The **database connection string** that is supported by Prisma Optimize.
2. An active [Prisma Data Platform](https://pris.ly/pdp) account.

## Getting started

### 1. Clone the respository

Clone the repository, navigate into it and install dependencies:

```terminal
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/optimize/starter
npm install
```

### 2. Configure environment variables

Create a `.env` in the root of the project directory:

```terminal
touch .env
```

Now, open the `.env` file and update the `DATABASE_URL` environment variable with the value of your connection string:

```env
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
# Note that __YOUR_DATABASE_CONNECTION_STRING__  is a placeholder value that you need to replace with the values of your connection string.
```

## 3. Setup the project

Perform a database migration for the project to work:

```terminal
npx prisma migrate dev --name init
```


## 4. Open the Optimize dashboard

You'll be able to create [recordings](https://pris.ly/optimize-recordings) and see the details of your queries along with optimization [recommendations](https://pris.ly/optimize-recommendations) to improve the queries in the Optimize dashboard. To access the dashboard:

1. Login to Prisma Data Platform by navigating to [this link](https://pris.ly/pdp).
2. Navigate to the [Optimize dashboard](https://optimize.prisma.io/).

## 5. Run the script

Let's first run the [script with unoptimized Prisma queries](./script.ts):

1. Navigate to the Optimize dashboard.
2. Click on the **Start new recording** button.
3. In the project terminal, run the project with:

   ```terminal
   npm run dev
   ```

4. After the script completes, click the **Stop recording** button.
5. Observe the queries with high latencies highlighted in red, and review the recommendations in the **Recommendations** tab. You should see three recommendations:
   - **Excessive number of rows returned**
   - **Query filtering on an unindexed column**
   - **Full table scans caused by LIKE operations**
6. Rename the recording to _Unoptimized queries_ by clicking on the recording chip in the top left corner and typing "Unoptimized queries", so that you have a reference to it for comparison with other recordings.
   ![Rename recording](./images/edit-recording-name-chip.png)

### Using the recommendations to improve query performance

Next, let's follow the recommendations provided by Optimize to improve the performance of the queries:

1. To improve the performance of [**Query 1**](./script.ts) and apply the recommendation of [**Excessive number of rows returned**](https://pris.ly/optimize/r/execessive-rows), add a `take` option to the query:

   ```typescript
   await prisma.user.findMany({
     take: 10,
   })
   ```

2. To improve the performance of [**Query 2**](./script.ts) to [**Query 4**](./script.ts) and apply the recommendation of [**Query filtering on an unindexed column**](https://pris.ly/optimize/r/unindexed-column), create an `index` on the `name` column (as the `name` column is commonly used in the queries) in the `User` model in the [`schema.prisma`](./prisma/schema.prisma) file:

   ```diff
   model User {
      id    Int     @id @default(autoincrement())
      email String  @unique
      name  String?
      posts Post[]
   +  @@index(name)
    }
   ```

   Then migrate the changes to your database using:

   ```terminal
   npx prisma migrate dev --name create-name-index-on-user-model
   ```

3. To improve the performance of [**Query 5**](./script.ts) and apply the recommendation of [**Full table scans caused by LIKE operations**](https://pris.ly/optimize/r/full-table-scan), create a new optional column `emailDomain` in the User model and index it in the [schema.prisma](./prisma/schema.prisma) file:

   ```diff
   model User {
      id    Int     @id @default(autoincrement())
      email String  @unique
   +  emailDomain String?
      name  String?
      posts Post[]
      @@index(name)
   +  @@index(emailDomain)
   }
   ```

   Then migrate the changes to your database using:

   ```terminal
   npx prisma migrate dev --name add-indexed-email-domain-column-on-user-model
   ```

   Then run the [copySuffixes script](./copySuffixes.ts) to copy the domains of the emails from the existing content to the new `emailDomain` column:

   ```terminal
   npm run copy-suffixes
   ```

   Then refactor the code in the [script.ts](./script.ts) file:

   ```diff
   // Query 5
    await prisma.user.findFirst({
     where: {
   -    email: {
   -      endsWith: 'gmail.com',
   -    },
   +    emailDomain: 'gmail.com',
     },
   })
   ```

4. Click the **Start new recording** button to begin a new recording.
5. In the project terminal, run the project with:
   ```terminal
   npm run dev
   ```
6. After the script completes, click the **Stop recording** button.
7. Rename the recording to _Optimized queries_, by clicking on the recording chip in the top left corner and typing "Optimized queries".

You can now compare the performance improvements, by navigating and observing the query latency differences in the "Optimized queries" and "Unoptimized queries" recordings tabs.

## Next steps

- Check out the [Optimize docs](https://pris.ly/d/optimize)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
