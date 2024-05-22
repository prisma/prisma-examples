import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.player.createMany({
    data: [
      {
        username: "Marc",
      },
      {
        username: "Ankur",
      },
      {
        username: "Jon",
      },
    ],
  });
  console.log(`Seeded the database with ${users.count} users.`);
}

main();
