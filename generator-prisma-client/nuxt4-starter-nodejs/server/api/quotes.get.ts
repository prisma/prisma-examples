import prisma from '../db'

export default defineEventHandler(async (_event) => {
  const quotes = await prisma.quotes.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return quotes
})
