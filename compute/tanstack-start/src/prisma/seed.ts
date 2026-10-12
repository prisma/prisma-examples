import { getDb } from './db'

const db = getDb()

// upsert() does not run nested relation writes, so each user is created with
// create(), together with its post, only when no user has that email yet.
async function createUserOnce(
  email: string,
  username: string,
  name: string,
  post: { title: string; content: string },
) {
  const existing = await db.orm.public.User.where({ email }).first()
  if (existing) return

  try {
    await db.orm.public.User.create({
      email,
      username,
      name,
      posts: (posts) => posts.create([{ ...post, published: true }]),
    })
  } catch (error) {
    // Another seed run created this user after the lookup above.
    if (isEmailConflict(error)) return
    throw error
  }
}

function isEmailConflict(error: unknown) {
  const { sqlState, constraint } = (error ?? {}) as {
    sqlState?: string
    constraint?: string
  }
  return sqlState === '23505' && constraint === 'user_email_key'
}

async function main() {
  await createUserOnce('alice@prisma.io', 'alice', 'Alice', {
    title: 'Hello from TanStack Start on Prisma Compute',
    content: 'This post was inserted by src/prisma/seed.ts.',
  })
  await createUserOnce('marie@prisma.io', 'marie', 'Marie', {
    title: 'Deploy with Prisma Composer',
    content: 'Push the connected branch to deploy with Composer.',
  })
}

main()
  .then(() => db.close())
  .catch(async (error) => {
    console.error(error)
    await db.close()
    process.exit(1)
  })
