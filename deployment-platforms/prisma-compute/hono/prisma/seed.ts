import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      username: "alice",
      name: "Alice",
      posts: {
        create: [
          {
            title: "Hello from Hono on Prisma Compute",
            content: "This post was inserted by prisma/seed.ts.",
            published: true,
          },
        ],
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "marie@prisma.io" },
    update: {},
    create: {
      email: "marie@prisma.io",
      username: "marie",
      name: "Marie",
      posts: {
        create: [
          {
            title: "Deploy with @prisma/cli",
            content: "Run npm run compute:deploy after setting DATABASE_URL in .env.",
            published: true,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
