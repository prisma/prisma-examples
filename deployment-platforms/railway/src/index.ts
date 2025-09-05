import 'dotenv/config'
import { Hono } from 'hono'
import { PrismaClient } from './generated/prisma/client'
import { serve } from '@hono/node-server'

const prisma = new PrismaClient()
const app = new Hono()

app.get('/', (c) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Prisma + Railway Example</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; }
          .endpoint { margin: 10px 0; padding: 10px; background: #f5f5f5; border-radius: 4px; }
          button { margin-left: 10px; padding: 4px 8px; cursor: pointer; }
          pre { margin-top: 20px; padding: 10px; border: 1px solid #ddd; background: #f9f9f9; }
        </style>
      </head>
      <body>
        <h1>API Endpoints</h1>
        
        <div class="endpoint">
          <code>GET /api</code>
          <button onclick="testEndpoint('/api')">Test</button>
        </div>
        
        <div class="endpoint">
          <code>GET /api/feed</code>
          <button onclick="testEndpoint('/api/feed')">Test</button>
        </div>
        
        <div class="endpoint">
          <code>GET /api/seed</code>
          <button onclick="testEndpoint('/api/seed')">Test</button>
        </div>
        
        <pre><code id="result">Click a button to test an endpoint</code></pre>

        <script>
          async function testEndpoint(endpoint) {
            const resultDiv = document.getElementById('result');
            resultDiv.textContent = 'Loading...';
            
            try {
              const response = await fetch(endpoint);
              const data = await response.json();
              resultDiv.textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              resultDiv.textContent = 'Error: ' + error.message;
            }
          }
        </script>
      </body>
    </html>
  `
  return c.html(html)
})

app.get('/api', async (c) => {
  return c.json({ up: true })
})

app.get('/api/seed', async (c) => {
  try {
    await prisma.post.deleteMany({})
    await prisma.user.deleteMany({})

    const author1 = await prisma.user.create({
      data: {
        email: 'jane@prisma.io',
        name: 'Jane Doe',
        posts: {
          create: {
            title: 'Comparing Database Types',
            content:
              'https://www.prisma.io/blog/comparison-of-database-models-1iz9u29nwn37/',
            published: true,
          },
        },
      },
      include: { posts: true },
    })

    const author2 = await prisma.user.create({
      data: {
        email: 'john@prisma.io',
        name: 'John Smith',
        posts: {
          create: {
            title: 'Getting Started with Prisma',
            content: 'https://www.prisma.io/docs/getting-started',
            published: true,
          },
        },
      },
      include: { posts: true },
    })

    return c.json({
      message: 'Database seeded successfully',
      authors: [author1, author2],
    })
  } catch (e) {
    return c.json({ error: 'Failed to seed database' }, 500)
  }
})

app.get('/api/feed', async (c) => {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  return c.json(posts)
})

const port = process.env.PORT ? Number(process.env.PORT) : 3000
console.log(`Server is running at http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
