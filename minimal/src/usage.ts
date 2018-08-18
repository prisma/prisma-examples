import { Prisma } from './prisma'
;(async () => {
  const prisma = new Prisma()

  const result = await prisma.query.cats()

  console.log(result)
})()
