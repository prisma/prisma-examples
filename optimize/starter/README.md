# Prisma Optimize Setup and Usage Example

This repository demonstrates how to set up and use [Prisma Optimize](https://pris.ly/optimize).

## Prerequisites

To successfully run the project, you will need the following:

1. A **database connection string** supported by Prisma Optimize.
2. An Optimize API key, which you can obtain from your [Prisma Data Platform](https://pris.ly/pdp) account.

## Getting Started

### 1. Clone the repository

Clone the repository, navigate into it, and install the dependencies:

```bash
git clone git@github.com:prisma/prisma-examples.git --depth=1
cd prisma-examples/optimize/starter
npm install
```

### 2. Configure environment variables

Create a `.env` file in the root of the project directory:

```bash
cp .env.example .env
```

Next, open the `.env` file and update the `DATABASE_URL` with your database connection string and the `OPTIMIZE_API_KEY` with your Optimize API key:

```env
# .env
DATABASE_URL="__YOUR_DATABASE_CONNECTION_STRING__"
# Replace __YOUR_DATABASE_CONNECTION_STRING__ with your actual connection string.
OPTIMIZE_API_KEY="your_secure_optimize_api_key"
```

- `DATABASE_URL`: The connection string to your database.
- `OPTIMIZE_API_KEY`: Reference the [Environment API Keys](https://www.prisma.io/docs/platform/about#environment) section in our documentation to learn how to obtain an API key for your project using Optimize.

### 3. Set up the project

Perform a database migration to prepare the project:

```bash
npx prisma migrate dev --name init
```

### 4. Open the Optimize dashboard

You can create [recordings](https://pris.ly/optimize-recordings) and view detailed insights into your queries, along with optimization [recommendations](https://pris.ly/optimize-recommendations), in the Optimize dashboard. To access the dashboard:

1. Log in to your [Prisma Data Platform](https://pris.ly/pdp) account.
2. In your desired [Workspace](https://www.prisma.io/docs/platform/about#workspace), click the **Optimize** tab on the left sidebar to open the Optimize dashboard.
   - If Optimize hasn't been launched yet, click the **Launch Optimize** button.

### 5. Run the script

Let's run the [script with unoptimized Prisma queries](./script.ts):

1. In the Optimize dashboard, click the **Start new recording** button.
2. In the project terminal, run the project with:

   ```bash
   npm run dev
   ```

3. After the script completes, you'll see a log saying "Done." Then, in the Optimize dashboard, click the **Stop recording** button.
4. Observe the queries with high latencies highlighted in red, and review the recommendations in the **Recommendations** tab. You should see three distinct recommendations:
   - **Excessive number of rows returned**
   - **Query filtering on an unindexed column**
   - **Full table scans caused by LIKE operations**
     > For more insights on a specific recommendation, click the **Ask AI** button and interact with the [AI Explainer](https://pris.ly/optimize-ai-chatbot) chatbot.
5. To create a reference for comparison with other recordings, rename the recording to _Unoptimized queries_ by clicking the green recording label chip in the top left corner and typing "Unoptimized queries".

   ![Rename recording](./images/edit-recording-name-chip.png)

### Using the recommendations to improve query performance

Next, let’s follow the recommendations provided by Optimize to improve the performance of the queries:

1. To improve the performance of [**Query 1**](./script.ts) by addressing the [**Excessive number of rows returned**](https://pris.ly/optimize/r/excessive-rows) recommendation, add a `take` option to the query:

   ```typescript
   await prisma.user.findMany({
     take: 10,
   })
   ```

2. To enhance the performance of [**Query 2**](./script.ts) through [**Query 4**](./script.ts) by addressing the [**Query filtering on an unindexed column**](https://pris.ly/optimize/r/unindexed-column) recommendation, add an `index` to the `name` column (commonly used in the queries) in the `User` model within the [`schema.prisma`](./prisma/schema.prisma) file:

   ```diff
   model User {
      id    Int     @id @default(autoincrement())
      email String  @unique
      name  String?
      posts Post[]
   +  @@index(name)
    }
   ```

   After making these changes, migrate them to your database using:

   ```bash
   npx prisma migrate dev --name create-name-index-on-user-model
   ```

3. To enhance the performance of [**Query 5**](./script.ts) by addressing the [**Full table scans caused by LIKE operations**](https://pris.ly/optimize/r/full-table-scan) recommendation, create a new optional `emailDomain` column in the `User` model and index it in the [`schema.prisma`](./prisma/schema.prisma) file:

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

   Next, migrate these changes to your database using:

   ```bash
   npx prisma migrate dev --name add-indexed-email-domain-column-on-user-model
   ```

   After migration, run the [copySuffixes script](./copySuffixes.ts) to copy email domains from existing entries into the new `emailDomain` column:

   ```bash
   npm run copy-suffixes
   ```

   Finally, refactor the code in the [script.ts](./script.ts) file to update Query 5:

   ```diff
   // Query 5
    await prisma.user.findFirst({
     where: {
   -    email: {
   -      endsWith: 'gmail.com',
   -    },
   +    emailDomain: 'gmail.com',
     },
   });
   ```

4. Click the **Start new recording** button to begin a new recording and check for any performance improvements.
5. In the project terminal, run the project with:
   ```bash
   npm run dev
   ```
6. After the script completes, click the **Stop recording** button.
7. Rename the recording to _Optimized queries_ by clicking the recording chip in the top left corner and typing "Optimized queries."

You can now compare performance improvements by navigating to the "Optimized queries" and "Unoptimized queries" recording tabs and observing the query latency differences.

---

## Next Steps

- Check out the [Optimize docs](https://pris.ly/d/optimize).
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/).
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/).
