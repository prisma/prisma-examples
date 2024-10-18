import { prisma } from './utils'

// A `main` function so that we can use async/await
async function main() {
  // A simple query to create the database connection as the database connection usually takes a lot of time
  await prisma.user.findFirst({
    select: {
      name: true,
    },
  })

  // Query 1
  const result = await prisma.user.findFirst({
    where: {
      name: 'Nikolas Burk',
    },
    include: {
      posts: {
        take: 10,
      },
    },
  })

  console.log("We should query only the retrieved values:");

  console.log({
    name: result?.name,
    email: result?.email,
    postIds: [...(result?.posts?.map((post) => post.id) ?? [])],
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
