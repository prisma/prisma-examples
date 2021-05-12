import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  console.dir(posts, { depth: Infinity })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
