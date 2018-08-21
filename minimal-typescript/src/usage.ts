import { Prisma } from '../generated/prisma'
;(async () => {
  const prisma = new Prisma()

  const result = await prisma
    .cat({ id: 'cjky74byofp1n0b07ux4038oe' })
    .favBrother()

  console.log(result)

  // await prisma.createMaster({
  //   catz: {
  //     create: [
  //       {
  //         color: 'red',
  //         name: 'Bob',
  //       },
  //     ],
  //   },
  // })
})()
