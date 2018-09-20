import { prisma } from './generated/prisma-client'

// A `main` function so that we can use async/await
async function main() {
  const post = await prisma.createPost({
    title: 'Draft post',
    content: 'This is a draft post.',
    author: { connect: { email: 'alice@prisma.io' } },
  })

  const id = post.id
  console.log(`Created post with id ${id}`)

  const posts = await prisma.posts({ where: { isPublished: false } })
  console.log(`Queried unpublished posts:`, posts)

  await prisma.updatePost({
    where: { id },
    data: { isPublished: true },
  })
  console.log(`Published Post with id: ${id}`)

  const publishedPosts = await prisma.posts({ where: { isPublished: true } })
  console.log(`Queried published posts`, publishedPosts)

  const publishedPost = await prisma.post({ id })
  console.log(`Queried for post with id ${id}`, publishedPost)

  await prisma.deletePost({ id })
  console.log(`Deleted post with id ${id}`)
}

main().catch(e => console.error(e))
