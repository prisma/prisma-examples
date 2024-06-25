import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
