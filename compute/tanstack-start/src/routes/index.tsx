import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

import { getDb } from '../prisma/db'

const listUsers = createServerFn({ method: 'GET' }).handler(async () => {
  const users = await getDb()
    .orm.public.User.include('posts')
    .orderBy((user) => user.createdAt.desc())
    .all()

  return users.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.username,
    name: user.name,
    createdAt: user.createdAt.toISOString(),
    postCount: user.posts.length,
  }))
})

export const Route = createFileRoute('/')({
  loader: () => listUsers(),
  component: Home,
})

function Home() {
  const users = Route.useLoaderData()

  return (
    <main className="shell">
      <h1>TanStack Start on Prisma Compute</h1>
      <p>This page loads users through a TanStack Start server function.</p>
      <p>
        JSON endpoint: <a href="/api/users">/api/users</a>
      </p>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name ?? user.email}</strong>{' '}
            <span>@{user.username ?? 'no-handle'}</span>{' '}
            <span>{user.postCount} post(s)</span>
          </li>
        ))}
      </ul>
    </main>
  )
}
