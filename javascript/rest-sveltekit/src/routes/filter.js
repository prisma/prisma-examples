import prisma from '$lib/prisma'

export async function get({ url }) {
  const searchString = url.searchParams.get('searchString')
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: { contains: searchString },
        },
        {
          content: { contains: searchString },
        },
      ],
    },
  })

  return { body: posts }
}
