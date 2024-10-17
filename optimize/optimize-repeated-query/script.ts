import { prisma } from './utils'

// A `main` function so that we can use async/await
async function main() {
  // A simple query to create the database connection as the database connection usually takes a lot of time
  await prisma.post.findFirst({
    select: {
      id: true,
    },
  })

  // Query 1
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })

  // Query 2
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })

  // Query 3
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })

  // Query 4
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })

  // Query 5
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })
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
