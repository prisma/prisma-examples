import { Prisma } from '../generated/prisma'
;(async () => {
  const prisma = new Prisma()

  const result = await prisma.cat({ id: 'cjky74byofp1n0b07ux4038oe' })

  // const result2 = await prisma.deleteCat({
  //   id: 'cjl2iuek89nqn0b46felq7f9a',
  // })

  console.log(result)
})()
