require('dotenv').config()
import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'


const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

async function main() {
  // create user
  const user = await prisma.user.create({
    data: {
      email: 'hana@hana.io',
      name: 'Hana',
    },
  })

  console.log(user)

  // find user
	const foundUser = await prisma.user.findUnique({
    where: {
      email: 'hana@hana.io'
    }
  })
  console.log(foundUser)

  // update user
  const updatedUser = await prisma.user.update({
    where: {
      email: 'hana@hana.io',
    },
    data: {
      name: 'Peters',
    },
  })
  console.log(updatedUser)

  // delete user
  const deleteUser = await prisma.user.delete({
    where: {
      email: 'hana@hana.io',
    }
  })
  console.log("User deleted", deleteUser)

  // create user with posts
  const userPosts = await prisma.user.create({
    data: {
      email: 'dave@prisma.io',
      name: 'David',
      posts: {
        create: [
          { title: 'Hello world' },
          { title: 'Introduction to Prisma with Mongo' },
          { title: 'MongoDB and schemas' },
        ],
      },
    },
    include: {
      posts: true,
    },
  })

  console.dir(userPosts, { depth: Infinity })

  // find posts
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  console.dir(posts, { depth: Infinity })
}




main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
