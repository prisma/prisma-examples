# Accelerate Next.js Starter Project

![Demo](./demo.gif)

Welcome to the Accelerate Next.js Starter Project! This project showcases how to integrate Prisma with Accelerate in a Next.js application.

It also [demonstrates](./app/api/route.ts#L15-46) every available caching strategy in Accelerate, along with a query that utilizes only connection pooling without any caching enabled.

> To learn more about cache strategies in Accelerate, visit our [docs](https://www.prisma.io/docs/data-platform/accelerate/concepts#cache-strategies).

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- Obtain an Accelerate API key from [Prisma Data Platform](https://pris.ly/pdp).
- Create a `.env` file in the project root directory with the following content:

```bash
# Accelerate connection string
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=ACCELERATE_API_KEY"

# To run migrations
DIRECT_URL="postgresql://username:password@host:5432/database_name"

NEXT_PUBLIC_URL="http://localhost:3000"
```

## Getting Started

To get started with this project, follow these steps:

1. Install project dependencies:

```bash
npm install
```

2. Set up Prisma by running migrations and generating a PrismaClient for edge functions:

```bash
npx prisma migrate dev
npx prisma generate --no-engine
```

3. Start the application:

```bash
npm run dev
```

That's it! You're now ready to explore and experiment with Accelerate in your Next.js project. Happy coding!