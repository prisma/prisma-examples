const { Prisma } = require('./generated')

// A `main` function so that we can use async/await
async function main() {
  const prisma = new Prisma()

  const result = await prisma.cats()

  console.log(result)
}

main().catch(e => console.error(e))
