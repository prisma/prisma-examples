import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log('All users:', users);

  // See more examples of how to use the Prisma ORM: https://www.prisma.io/docs/getting-started/quickstart
}

main();
