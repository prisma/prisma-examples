import { UserCreateInput } from '@prisma/client'

export const seedUsers: UserCreateInput[] = [
  {
    email: 'jane@prisma.io',
    name: 'Jane',
    profile: {
      create: {
        bio: 'Technical Writer',
      },
    },
    posts: {
      create: [
        {
          title:
            'Comparing Database Types: How Database Types Evolved to Meet Different Needs',
          content:
            'https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/',
          published: true,
        },
        {
          title: 'Analysing Sleep Patterns: The Quantified Self',
          content: 'https://quantifiedself.com/get-started/',
          published: true,
        },
      ],
    },
  },
  {
    email: 'toru@prisma.io',
    name: 'Toru Takemitsu',
    profile: {
      create: {
        bio: 'Composer',
      },
    },
    posts: {
      create: [
        {
          title: 'Requiem for String Orchestra',
          content: '',
          published: true,
        },
        {
          title: 'Music of Tree',
          content: '',
        },
        {
          title: 'Waves for clarinet, horn, two trombones and bass drum ',
          content: '',
          published: true,
        },
      ],
    },
  },
]