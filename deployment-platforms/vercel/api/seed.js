import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    await Promise.all([
      prisma.profile.deleteMany({}),
      prisma.post.deleteMany({}),
    ])
    await prisma.user.deleteMany({})

    const createdUser = await prisma.user.create({
      data: seedUser
    })

    const createdUser2 = await prisma.user.create({
      data: seedUser2
    })

    res.status(201).json([createdUser, createdUser2])
  } catch (error) {
    console.error(error)
    res.status(500)
  }
}

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

const seedUser2 = {
  email: 'toru@prisma.io',
  name: 'Toru Takemitsu',
  profiles: {
    create: [
      {
        bio: 'Composer'
      },
      {
        bio: 'Musician'
      },
      {
        bio: 'Writer'
      }
    ]
  },
  posts: {
    create: [
      {
        title: 'Requiem for String Orchestra',
        content: ''
      },
      {
        title: 'Music of Tree',
        content: ''
      },
      {
        title: 'Waves for clarinet, horn, two trombones and bass drum ',
        content: ''
      }
    ]
  }
}
