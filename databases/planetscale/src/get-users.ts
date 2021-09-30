import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that we can use async/await
async function main() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  })

  console.log(users)
  const posts = await prisma.post.findMany()
  console.log(posts)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
