import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const players = await prisma.player.createMany({
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
  console.log(`Seeded the database with ${players.count} players.`);
}

main();
