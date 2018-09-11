import { prisma } from './generated'
;(async () => {
  const result = await prisma.cats(
    {},
    `fragment Cat on Cat { id name favBrother { id } }`,
  )

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
