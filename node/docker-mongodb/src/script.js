const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {
  // Retrieve all published posts
  const allPosts = await prisma.posts({
    where: { published: true },
  })
  console.log(`Retrieved all published posts: `, allPosts)

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.createPost({
    title: 'Join the Prisma Slack community',
    content: 'http://slack.prisma.io',
    author: {
      connect: {
        email: 'alice@prisma.io', // Should have been created during initial seeding
      },
    },
  })
  console.log(`Created a new post: `, newPost)

  // Publish the new post
  const updatedPost = await prisma.updatePost({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  })
  console.log(`Published the newly created post: `, updatedPost)

  // Write a comment
  const postWithComment = await prisma.updatePost({
    where: {
      id: newPost.id,
    },
    data: {
      comments: {
        create: {
          text: 'Wow, there are so many active members on the Prisma Slack!',
          writtenBy: {
            connect: {
              email: 'bob@prisma.io',
            },
          },
        },
      },
    },
  })
  console.log(`Wrote a comment for the new post: `, postWithComment)

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await prisma
    .user({
      email: 'alice@prisma.io',
    })
    .posts()
  console.log(`Retrieved all posts from a specific user: `, postsByUser)
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch(e => console.error(e))
