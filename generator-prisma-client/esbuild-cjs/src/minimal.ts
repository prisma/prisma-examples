import prisma from './db'

async function main() {
  const quotes = await prisma.quotes.findMany({ take: 2 })
  console.log(quotes)
}

main()
