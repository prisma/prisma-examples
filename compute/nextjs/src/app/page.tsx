import type { FieldOutputTypes } from '../prisma/contract.d'
import { getDb } from '../prisma/db'

type PostRow = Pick<FieldOutputTypes['public']['Post'], 'id' | 'title' | 'published'>

// Included relations come back loosely typed, so narrow the fields this page reads.
const toPostRow = (post: Record<string, unknown>): PostRow => ({
  id: Number(post.id),
  title: String(post.title),
  published: Boolean(post.published),
})

export const dynamic = 'force-dynamic'

export default async function Home() {
  const rows = await getDb()
    .orm.public.User.include('posts')
    .orderBy((user) => user.createdAt.desc())
    .all()
  const users = rows.map((user) => ({ ...user, posts: user.posts.map(toPostRow) }))
  const posts = users.flatMap((user) => user.posts)
  const published = posts.filter((post) => post.published)

  return (
    <main className="page">
      <div className="topbar">
        <div className="brand">
          <i aria-hidden />
          Prisma Compute
        </div>
        <div className="chips">
          <span className="chip">Next.js</span>
          <span className="chip">Prisma ORM</span>
          <span className="chip">Prisma Postgres</span>
        </div>
      </div>

      <section className="hero">
        <h1>Next.js on Prisma Compute</h1>
        <p>
          This App Router page reads users and their posts from Prisma Postgres through Prisma
          ORM. Push the connected branch and Prisma Composer provisions the database and
          deploys the app.
        </p>
        <div className="stats">
          <div className="stat">
            <b>{users.length}</b>
            <span>Users</span>
          </div>
          <div className="stat">
            <b>{posts.length}</b>
            <span>Posts</span>
          </div>
          <div className="stat">
            <b>{published.length}</b>
            <span>Published</span>
          </div>
        </div>
      </section>

      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="empty">
          No users yet. Run <code>bun run db:seed</code> to add some.
        </p>
      ) : (
        <ul className="users">
          {users.map((user, index) => (
            <li key={user.id} className="user">
              <header>
                <span className={`avatar a${index % 3}`} aria-hidden>
                  {(user.name ?? user.email).charAt(0).toUpperCase()}
                </span>
                <div>
                  <strong>{user.name ?? user.email}</strong>
                  <small>@{user.username ?? 'no-handle'}</small>
                </div>
              </header>
              {user.posts.length > 0 && (
                <ul className="posts">
                  {user.posts.map((post) => (
                    <li key={post.id}>
                      <span>{post.title}</span>
                      <span className={post.published ? 'badge' : 'badge draft'}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className="foot">
        <span>
          JSON:{' '}
          <a href="/api/users">
            <code>GET /api/users</code>
          </a>
        </span>
        <span>
          Deploy: <code>bun run compute:connect</code>
        </span>
      </div>
    </main>
  )
}
