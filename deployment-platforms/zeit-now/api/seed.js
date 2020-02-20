const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const seedUser = {
  email: 'jane@prisma.io',
  name: 'Jane',
  profiles: {
    create: [
      {
        bio: 'Technical Writer'
      },
      {
        bio: 'Health Enthusiast'
      },
      {
        bio: 'Self Quantifier'
      }
    ]
  },
  posts: {
    create: [
      {
        title:
          'Comparing Database Types: How Database Types Evolved to Meet Different Needs',
        content:
          'https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/'
      },
      {
        title: 'Analysing Sleep Patterns: The Quantified Self',
        content: 'https://quantifiedself.com/get-started/'
      }
    ]
  }
}

module.exports = async (req, res) => {
  try {
    await Promise.all([prisma.profile.deleteMany(), prisma.post.deleteMany()])
    await prisma.user.deleteMany()

    const createdUser = await prisma.user.create({
      data: seedUser,
      include: { posts: true, profiles: true }
    })

    res.status(201).json(createdUser)
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}
