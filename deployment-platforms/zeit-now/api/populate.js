const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const seedUser = {
  data: {
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
}

module.exports = async (req, res) => {
  try {
    const userJustin = await prisma.user.create(seedUser)
    res.status(201).json(userJustin)
  } catch (error) {
    console.error(error)
    console.error(typeof error)
    res.status(500).json(error)
  }
}
