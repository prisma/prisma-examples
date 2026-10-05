import { serve } from '@hono/node-server'
import { Hono } from 'hono'

import type { FieldOutputTypes } from './prisma/contract.d.js'
import { getDb } from './prisma/db.js'

type PostRow = Pick<FieldOutputTypes['public']['Post'], 'id' | 'title' | 'published'>

// Included relations come back loosely typed, so narrow the fields this page reads.
const toPostRow = (post: Record<string, unknown>): PostRow => ({
  id: Number(post.id),
  title: String(post.title),
  published: Boolean(post.published),
})

const app = new Hono()

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char,
  )

const styles = `
  :root { --bg: #f6f6f7; --card: #fff; --ink: #1b1b1f; --muted: #6b6f76; --line: rgba(0,0,0,.08); --cyan: #01d7e4; --yellow: #f3c306; --red: #f34a60; }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font-family: system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
  a { color: #007f8d; }
  code { background: #ececef; border-radius: 6px; padding: 2px 6px; font-size: 12.5px; }
  .page { max-width: 920px; margin: 0 auto; padding: 32px 24px 64px; }
  .topbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
  .brand { display: flex; align-items: center; gap: 10px; font-weight: 600; }
  .brand i { display: inline-block; width: 20px; height: 20px; border-radius: 6px; background: linear-gradient(135deg, var(--cyan), var(--yellow) 50%, var(--red)); }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip { font-size: 13px; font-weight: 500; padding: 6px 10px; border: 1px solid var(--line); border-radius: 999px; background: var(--card); }
  .hero { position: relative; overflow: hidden; background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: 36px 36px 28px; box-shadow: 0 1px 2px rgba(0,0,0,.04); }
  .hero::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 4px; background: linear-gradient(90deg, var(--cyan), var(--yellow), var(--red)); }
  .hero h1 { margin: 0 0 10px; font-size: 32px; letter-spacing: -.02em; }
  .hero p { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.6; max-width: 56ch; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 28px; }
  .stat { border: 1px solid var(--line); border-radius: 12px; padding: 14px 16px; background: var(--bg); }
  .stat b { display: block; font-size: 24px; letter-spacing: -.02em; }
  .stat span { font-size: 12px; color: var(--muted); text-transform: uppercase; letter-spacing: .06em; }
  h2 { margin: 32px 0 12px; font-size: 14px; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
  .users { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px; margin: 0; padding: 0; list-style: none; }
  .user { background: var(--card); border: 1px solid var(--line); border-radius: 14px; padding: 18px; }
  .user header { display: flex; align-items: center; gap: 12px; }
  .avatar { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; font-weight: 700; color: #fff; background: linear-gradient(135deg, var(--cyan), var(--red)); }
  .avatar.a1 { background: linear-gradient(135deg, var(--yellow), var(--red)); }
  .avatar.a2 { background: linear-gradient(135deg, var(--cyan), var(--yellow)); }
  .user strong { display: block; font-size: 15px; }
  .user small { color: var(--muted); font-size: 13px; }
  .posts { margin: 14px 0 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }
  .posts li { display: flex; justify-content: space-between; gap: 12px; padding: 10px 0; border-bottom: 1px solid var(--line); font-size: 14px; }
  .posts li:last-child { border-bottom: 0; }
  .badge { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 999px; background: #e6fbfc; color: #007f8d; white-space: nowrap; }
  .badge.draft { background: #f1f1f3; color: var(--muted); }
  .empty { padding: 32px; border: 1px dashed var(--line); border-radius: 14px; color: var(--muted); text-align: center; }
  .foot { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 32px; font-size: 13px; color: var(--muted); }
`

app.get('/', async (c) => {
  const rows = await getDb()
    .orm.public.User.include('posts')
    .orderBy((user) => user.createdAt.desc())
    .all()
  const users = rows.map((user) => ({ ...user, posts: user.posts.map(toPostRow) }))
  const posts = users.flatMap((user) => user.posts)
  const published = posts.filter((post) => post.published)

  const userCards = users
    .map((user, index) => {
      const label = escape(user.name ?? user.email)
      const postRows = user.posts
        .map(
          (post) =>
            `<li><span>${escape(post.title)}</span><span class="badge${post.published ? '' : ' draft'}">${post.published ? 'Published' : 'Draft'}</span></li>`,
        )
        .join('')
      return `<li class="user">
        <header>
          <span class="avatar a${index % 3}" aria-hidden="true">${label.charAt(0).toUpperCase()}</span>
          <div><strong>${label}</strong><small>@${escape(user.username ?? 'no-handle')}</small></div>
        </header>
        ${postRows ? `<ul class="posts">${postRows}</ul>` : ''}
      </li>`
    })
    .join('')

  return c.html(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Prisma Compute Hono</title>
    <style>${styles}</style>
  </head>
  <body>
    <main class="page">
      <div class="topbar">
        <div class="brand"><i aria-hidden="true"></i>Prisma Compute</div>
        <div class="chips">
          <span class="chip">Hono</span>
          <span class="chip">Prisma ORM</span>
          <span class="chip">Prisma Postgres</span>
        </div>
      </div>

      <section class="hero">
        <h1>Hono on Prisma Compute</h1>
        <p>A small Hono API reading users and their posts from Prisma Postgres through Prisma ORM. Push the connected branch and Prisma Composer provisions the database and deploys the service.</p>
        <div class="stats">
          <div class="stat"><b>${users.length}</b><span>Users</span></div>
          <div class="stat"><b>${posts.length}</b><span>Posts</span></div>
          <div class="stat"><b>${published.length}</b><span>Published</span></div>
        </div>
      </section>

      <h2>Users</h2>
      ${
        users.length === 0
          ? '<p class="empty">No users yet. Run <code>bun run db:seed</code> to add some.</p>'
          : `<ul class="users">${userCards}</ul>`
      }

      <div class="foot">
        <span>JSON: <a href="/api/users"><code>GET /api/users</code></a></span>
        <span>Deploy: <code>bun run compute:connect</code></span>
      </div>
    </main>
  </body>
</html>`)
})

app.get('/api/users', async (c) => {
  const users = await getDb()
    .orm.public.User.include('posts')
    .orderBy((user) => user.createdAt.desc())
    .all()

  return c.json(users)
})

const port = Number(process.env.PORT ?? 8080)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
