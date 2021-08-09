import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'hana@hana.io'
    }
  })
  console.log(user)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
