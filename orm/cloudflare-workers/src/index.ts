import { PrismaClient } from './generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

export interface Env {
  DATABASE_URL: string
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method

    if (path === '/favicon.ico')
      return new Response('Resource not found', {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })

    const adapter = new PrismaPg({
      connectionString: env.DATABASE_URL,
    })

    const prisma = new PrismaClient({
      adapter,
    })

    try {
      // CREATE - Create a new user
      if (path === '/users' && method === 'POST') {
        const body = (await request.json()) as { email: string; name: string }
        const user = await prisma.user.create({
          data: {
            email: body.email || `user-${Date.now()}@example.com`,
            name: body.name || 'Anonymous User',
          },
        })
        return new Response(JSON.stringify({ success: true, user }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // READ - Get all users
      if (path === '/users' && method === 'GET') {
        const users = await prisma.user.findMany()
        return new Response(
          JSON.stringify({ success: true, users, count: users.length }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      // READ - Get a specific user by ID
      if (path.startsWith('/users/') && method === 'GET') {
        const id = parseInt(path.split('/')[2])
        if (isNaN(id)) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid user ID' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        const user = await prisma.user.findUnique({
          where: { id },
        })
        if (!user) {
          return new Response(
            JSON.stringify({ success: false, error: 'User not found' }),
            {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        return new Response(JSON.stringify({ success: true, user }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // UPDATE - Update a user by ID
      if (path.startsWith('/users/') && method === 'PUT') {
        const id = parseInt(path.split('/')[2])
        if (isNaN(id)) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid user ID' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        const body = (await request.json()) as { email?: string; name?: string }
        const user = await prisma.user.update({
          where: { id },
          data: body,
        })
        return new Response(JSON.stringify({ success: true, user }), {
          headers: { 'Content-Type': 'application/json' },
        })
      }

      // DELETE - Delete a specific user by ID
      if (path.startsWith('/users/') && method === 'DELETE') {
        const id = parseInt(path.split('/')[2])
        if (isNaN(id)) {
          return new Response(
            JSON.stringify({ success: false, error: 'Invalid user ID' }),
            {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
        const user = await prisma.user.delete({
          where: { id },
        })
        return new Response(
          JSON.stringify({
            success: true,
            user,
            message: 'User deleted successfully',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      // DELETE - Delete all users
      if (path === '/users' && method === 'DELETE') {
        const result = await prisma.user.deleteMany()
        return new Response(
          JSON.stringify({
            success: true,
            deletedCount: result.count,
            message: 'All users deleted',
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
      }

      // Default route - show API documentation
      return new Response(
        JSON.stringify(
          {
            message: 'Cloudflare Workers + Prisma CRUD API',
            endpoints: {
              'POST /users': 'Create a new user (body: { email, name })',
              'GET /users': 'Get all users',
              'GET /users/:id': 'Get a specific user by ID',
              'PUT /users/:id': 'Update a user by ID (body: { email?, name? })',
              'DELETE /users/:id': 'Delete a specific user by ID',
              'DELETE /users': 'Delete all users',
            },
          },
          null,
          2,
        ),
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
    } catch (error: any) {
      return new Response(
        JSON.stringify({
          success: false,
          error: error.message || 'An error occurred',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }
  },
} satisfies ExportedHandler<Env>
