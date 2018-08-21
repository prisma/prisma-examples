const { Prisma } = require('../generated/prisma')
;(async () => {
  const prisma = new Prisma()

  const result = await prisma.cats()

  console.log(result)
})()
