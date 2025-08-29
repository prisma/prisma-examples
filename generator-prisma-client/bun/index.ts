import { prisma } from './db'

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const { pathname } = new URL(req.url)

    // Do not create a user for the favicon request
    if (pathname === '/favicon.ico') {
      return new Response(null, { status: 204 }) // or serve an icon if you have one
    }

    // Create a new user
    const user = await prisma.user.create({
      data: {
        name: `John-${Math.random()}`,
        email: `john-${Math.random()}@example.com`,
      },
    })

    // Count all users
    const count = await prisma.user.count()

    // Format the response with JSON
    return new Response(
      JSON.stringify({
        message: `New user ${user.name} created successfully.`,
        totalUsers: count,
      }),
      { headers: { 'Content-Type': 'application/json' } },
    )
  },
})

console.log(`Listening on http://localhost:${server.port}`)
