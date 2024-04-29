# Accelerate Next.js Starter Project

![Demo](./demo.gif)

Welcome to the Accelerate Next.js Starter Project! This project showcases how to use Prisma ORM with Prisma Accelerate in a Next.js application.

It [demonstrates](./app/api/route.ts#L15-46) every available caching strategy in Accelerate, along with a query that only uses connection pooling.

> To learn more about cache strategies in Accelerate, visit our [docs](https://www.prisma.io/docs/data-platform/accelerate/concepts#cache-strategies).

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Obtain an Accelerate API key from [Prisma Data Platform](https://pris.ly/pdp).

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository and navigate into it:
    ```typescript
    git clone git@github.com:prisma/prisma-examples.git --depth=1
    cd prisma-examples/prisma-data-platform/accelerate/nextjs
    ```
2. Install project dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the project root directory with the following content:
    ```bash
    # Accelerate connection string
    DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=ACCELERATE_API_KEY"

    # To run migrations
    DIRECT_URL="postgresql://username:password@host:5432/database_name"

    NEXT_PUBLIC_URL="http://localhost:3000"
    ```
4. Set up Prisma by running migrations and generating a PrismaClient for edge functions:
    ```bash
    npx prisma migrate dev
    npx prisma generate --no-engine
    ```
5. Start the application:
    ```bash
    npm run dev
    ```

## Next steps

- Learn more about Accelerate by reading the [docs](https://www.prisma.io/docs/accelerate).
- Reach out to us in [Discord](https://pris.ly/discord) if you need help.
