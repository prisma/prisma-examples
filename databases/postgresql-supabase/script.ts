import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {

  const doesUserExist = await prisma.user.findFirst({
    where: {
      email: 'alice@prisma.io'
    }
  })

  if(!doesUserExist) {
    console.log('To run this example, please execute the seed script first.');
    console.log('This script will add a user with the email alice@prisma.io to the database.');
    console.log('The user is required for one of the queries.');
    console.log('You can run the seed script using the following command:');
    console.log('npx prisma db seed');
    return
  }

  // Retrieve all published posts
  const allPosts = await prisma.post.findMany({
    where: { published: true },
  })
  console.log('Retrieved all published posts: ', allPosts)

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.post.create({
    data: {
      title: "Join us for another episode of What's new in Prisma",
      content: 'https://youtube.com/playlist?list=PLn2e1F9Rfr6l1B9RP0A9NdX7i7QIWfBa7',
      published: false,
      author: {
        connect: {
          email: 'alice@prisma.io',
        },
      },
    },
  })
  console.log('Created a new post:', newPost)

  // Publish the new post
  const updatedPost = await prisma.post.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  })
  console.log(`Published the newly created post: `, updatedPost)

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await prisma.user
    .findUnique({
      where: {
        email: 'alice@prisma.io',
      },
    })
    .posts()
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
