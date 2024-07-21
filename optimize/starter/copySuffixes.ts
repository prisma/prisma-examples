import { PrismaClient } from '@prisma/client'

const main = async () => {
  const prisma = new PrismaClient()

  const posts = await prisma.post.findMany({
    where: {
      content: {
        not: null,
      },
      contentEndsWith: null,
    },
  })

  for (let post of posts) {
    const contentArr = post.content?.split(' ')

    const lastContent = contentArr?.[contentArr?.length - 1]

    console.log(lastContent)

    await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        contentEndsWith: lastContent,
      },
    })
  }
}

main()
  .then(() => {
    console.log('Suffixes moved.')
  })
  .catch(console.log)
