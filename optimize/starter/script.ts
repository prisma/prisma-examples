import { PrismaClient } from '@prisma/client'
import { withOptimize } from '@prisma/extension-optimize'

const prisma = new PrismaClient().$extends(withOptimize())

// A `main` function so that we can use async/await
async function main() {
  // Query 1
  const result1 = await prisma.user.findMany({})
  console.log(result1)

  // Query 2
  const result2 = await prisma.post.findFirst({
    where: {
      title: 'The Great Gatsby',
    },
  })
  console.log(result2)

  // Query 3
  const result3 = await prisma.post.findMany({
    where: {
      content: {
        startsWith: '\\_The',
      },
    },
  })
  console.log(result3)
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('Done')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
