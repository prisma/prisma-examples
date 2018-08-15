import { Prisma } from './prisma'
;(async () => {
  const prisma = new Prisma()

  const result = await prisma.delegate.query.cities<any>()

  console.log(result)
})()
