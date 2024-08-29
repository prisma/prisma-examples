import { PrismaClient } from '@prisma/client'

const main = async () => {
  const prisma = new PrismaClient()

  const users = await prisma.user.findMany({
    where: {
      emailDomain: null,
    },
  })

  for (let user of users) {
    const arr = user.email?.split('@')

    const provider = arr?.[arr?.length - 1]

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        emailDomain: provider,
      },
    })
  }
}

main()
  .then(() => {
    console.log('Email providers copied.')
  })
  .catch(console.log)
