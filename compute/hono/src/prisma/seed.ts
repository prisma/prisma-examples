import { getDb } from './db.js'

const db = getDb()

async function main() {
  await db.orm.public.User.upsert({
    create: {
      email: 'alice@prisma.io',
      username: 'alice',
      name: 'Alice',
      posts: (posts) =>
        posts.create([
          {
            title: 'Hello from Hono on Prisma Compute',
            content: 'This post was inserted by src/prisma/seed.ts.',
            published: true,
          },
        ]),
    },
    update: {},
    conflictOn: { email: 'alice@prisma.io' },
  })

  await db.orm.public.User.upsert({
    create: {
      email: 'marie@prisma.io',
      username: 'marie',
      name: 'Marie',
      posts: (posts) =>
        posts.create([
          {
            title: 'Deploy with Prisma Composer',
            content: 'Push the connected branch to deploy with Composer.',
            published: true,
          },
        ]),
    },
    update: {},
    conflictOn: { email: 'marie@prisma.io' },
  })
}

main()
  .then(() => db.close())
  .catch(async (error) => {
    console.error(error)
    await db.close()
    process.exit(1)
  })
