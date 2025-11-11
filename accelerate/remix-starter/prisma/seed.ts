import { PrismaClient } from "./generated/client";
import "dotenv/config";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL,
});

async function main() {
  console.log("Seeding started...");
  await prisma.quotes.create({
    data: {
      quote:
        "Prisma Accelerate and Remix together make a powerhouse combo, boosting performance and simplifying full-stack development with ease and efficiency.",
    },
  });
  console.log("Seeding completed");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
