import prisma from '../../pages/db.ts'

export const getQuotes = async (strategy?: any) => {
  const start = Date.now()

  const result = await prisma.quotes
    .findMany({
      cacheStrategy: strategy,
      orderBy: {
        id: 'desc',
      },
      take: 1,
    })
    .withAccelerateInfo()

  return {
    data: result?.data?.[0],
    info: result.info,
    time: Date.now() - start,
  }
}

export const addQuote = async (quote: string) => {
  return await prisma.quotes.create({
    data: {
      quote,
    },
  })
}
