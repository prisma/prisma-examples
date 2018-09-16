const { prisma } = require('./generated/prisma-client')

// A `main` function so that we can use async/await
async function main() {
  console.log('Creating a draft post with our seeded user alice@prisma.io')
  console.log(
    '~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
  )
  const draftPost = await prisma.createPost({
    title: 'Draft post',
    content: 'This is a draft post.',
    author: { connect: { email: 'alice@prisma.io' } },
  })

  const id = draftPost.id

  console.log(`Draft Post:`, draftPost)
  console.log(`Post Id:`, id)

  console.log('Querying for all draft posts')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  const draftPosts = await prisma.posts({ where: { isPublished: false } })
  console.log(`Draft Posts:`, draftPosts)

  console.log(`Publishing Draft Post ${id}`)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  await prisma.updatePost({
    where: { id },
    data: { isPublished: true },
  })

  console.log('Querying for all published posts')
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

  const publishedPosts = await prisma.posts({ where: { isPublished: true } })
  console.log(`Published Posts:`, publishedPosts)

  console.log(`Querying for post with id ${id}`)
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
  const post = await prisma.post({ id })
  console.log(`Post:`, post)

  console.log(`Deleting Post ${id}`)
  console.log('~~~~~~~~~~~~~~~~~~~')
  await prisma.deletePost({ id })
}

main().catch(e => console.error(e))
