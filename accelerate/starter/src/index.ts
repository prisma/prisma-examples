import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Percy Prisma',
      email: 'percy@prisma.io',
    },
  });
  console.log('The new user:', newUser);

  const users = await prisma.user.findMany({
    cacheStrategy: { ttl: 60 },
  });
  console.log('All users:', users);

  const cachedUsers = await prisma.user.findMany({
    cacheStrategy: { ttl: 60 },
  }).withAccelerateInfo();
  console.log('Cached users:', cachedUsers);

  // See more examples of how to use Prisma Accelerate: https://www.prisma.io/docs/accelerate/examples
}

main();
