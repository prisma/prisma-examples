import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import 'dotenv/config'
import prisma, { type PrismaClient } from './db'

const app = new Hono<{
  Variables: {
    db: PrismaClient,
  },
}>()

app.use('*', async (c, next) => {
  c.set('db', prisma)
  await next()
})

app.get('/quotes', async (c) => {
  const db = c.get('db')
  const quotes = await db.quotes.findMany({ take: 2 })
  return c.json(quotes)
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

const server = serve({
  fetch: app.fetch,
  port,
})

// graceful shutdown
process.on('SIGINT', () => {
  server.close()
  process.exit(0)
})

process.on('SIGTERM', () => {
  server.close((err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    process.exit(0)
  })
})
