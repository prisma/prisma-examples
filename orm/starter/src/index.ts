import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Percy Prisma',
      email: 'percy@example.com',
    },
  });
  console.log('The new user:', newUser);

  const users = await prisma.user.findMany();
  console.log('All users:', users);

  // See more examples of how to use Prisma ORM: https://www.prisma.io/docs/getting-started/quickstart
}

main();
