import { prisma } from "./utils";

// A `main` function so that we can use async/await
async function main() {
  // A simple query to create the database connection as the database connection usually takes a lot of time
  await prisma.user.findFirst()

  // Query 1: An optimized findMany operation with pagination
  await prisma.user.findMany({
    take: 10
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Done");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
