import { Prisma } from '../generated/prisma'
const prisma = new Prisma({debug: true})

;(async () => {

  for (let i = 0; i < 3; i++) {
    const before = Date.now()
    const result = await prisma
      .cat({ id: 'cjky74byofp1n0b07ux4038oe' })
      .favBrother()
    console.log(`Needed ${Date.now() - before}`)
  }


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
