import { prisma } from './prisma-client'

// A `main` function so that we can use async/await
async function main() {
  const result = await prisma
    .cats()
    .$fragment(`fragment Cat on Cat { id name favBrother { id } }`)

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
}

main().catch(e => console.error(e))
