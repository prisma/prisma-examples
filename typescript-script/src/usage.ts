import { prisma } from './generated'

;(async () => {

  const result = await prisma
    .cat({ id: 'cjky74byofp1n0b07ux4038oe' })
    .favBrother()

  console.log(result)

  await prisma.createMaster({
    catz: {
      create: [
        {
          color: 'red',
          name: 'Bob',
        },
      ],
    },
  })

})()
