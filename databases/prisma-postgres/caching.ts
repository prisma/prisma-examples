import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

async function main() {

  // Learn more about caching: 
  // https://www.prisma.io/docs/accelerate/caching
  const cachedUsersWithPosts = await prisma.user.findMany({
    where: {
      email: {
        contains: "alice"
      }
    },
    include: {
      posts: true
    },
    cacheStrategy: {
      swr: 30, // 30 seconds
      ttl: 60  // 60 seconds
    }
  })
  console.log(cachedUsersWithPosts)

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
