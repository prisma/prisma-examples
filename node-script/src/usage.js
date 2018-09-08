const { Prisma } = require('./generated')
;(async () => {
  const prisma = new Prisma()

  const result = await prisma.cats()

  console.log(result)
})()
