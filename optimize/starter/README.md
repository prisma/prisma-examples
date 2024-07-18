# Simple TypeScript Script Example

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

You have to migrate the database for the project to work:

```terminal
npx prisma migrate dev --init
```

Then, you have to seed the database so that you have placeholder variables using:

```terminal
npx prisma db seed
```

## 4. Open the Optimize dashboard

You'll be able to create [recordings](https://pris.ly/optimize-recordings) and see the details of your queries along with optimization [recommendations](https://pris.ly/optimize-recommendations) to improve the queries in the Optimize dashboard. To access the dashboard:

1. Login to Prisma Data Platform by navigating to [this link](pris.ly/pdp).
2. Navigate to the [Optimize dashboard](https://optimize-dev-dev.prisma.workers.dev/).

## 5. Run the scripts

Let's first run the [script with unoptimized Prisma queries](./script.ts):

1. Navigate to the Optimize dashboard.
2. Click on the **Start new recording** button.
3. In the project terminal, run the project with:
    ```terminal
    npm run dev
    ```
4. After the script completes, click the **Stop recording** button.
5. Observe the queries with high latencies highlighted in red, and review the recommendations in the **Recommendations** tab.
6. Rename the recording by clicking on the recording chip in the top right corner and typing "Unoptimized queries".
    ![Rename recording](./images/edit-recording-name-chip.png)

Next, let's run [the script with optimized Prisma queries](./optimized-script.ts):

1. Click the **Start new recording** button to begin a new recording.
2. In the project terminal, run the project with:
    ```terminal
    npm run dev-optimized
    ```
3. After the script completes, click the **Stop recording** button.
4. Observe the reduced query latencies highlighted in green.
5. Rename the recording by clicking on the recording chip in the top right corner and typing "Optimized queries".

You can now compare the performance differences by observing the query latencies in the "Optimized queries" and "Unoptimized queries" recordings tabs.

## Next steps

- Check out the [Optimize docs](https://pris.ly/d/optimize)
- Share your feedback on the [Prisma Discord](https://pris.ly/discord/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
