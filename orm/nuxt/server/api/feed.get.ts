export default defineEventHandler(async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    include: {
      author: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return posts
})

