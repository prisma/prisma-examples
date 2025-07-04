import prisma from '~/lib/db'

export default defineEventHandler(async (event) => {
  const quotes = await prisma.quotes.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return quotes
})
