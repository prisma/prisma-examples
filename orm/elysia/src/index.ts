import { Elysia, t } from 'elysia'
import { prisma } from './lib/prisma'
import { TodoPlain, TodoPlainInputCreate, TodoPlainInputUpdate } from './generated/prismabox/Todo'

const app = new Elysia()
  // Health check
  .get('/', () => {
    return { message: 'Hello Elysia with Prisma!' }
  })

  // Get all todos
  .get(
    '/todos',
    async () => {
      const todos = await prisma.todo.findMany({
        orderBy: { createdAt: 'desc' },
      })
      return todos
    },
    {
      response: t.Array(TodoPlain),
    }
  )

  // Get a single todo by ID
  .get(
    '/todos/:id',
    async ({ params, set }) => {
      const id = Number(params.id)
      const todo = await prisma.todo.findUnique({
        where: { id },
      })

      if (!todo) {
        set.status = 404
        return { error: 'Todo not found' }
      }

      return todo
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      response: {
        200: TodoPlain,
        404: t.Object({
          error: t.String(),
        }),
      },
    }
  )

  // Create a new todo
  .post(
    '/todos',
    async ({ body }) => {
      const todo = await prisma.todo.create({
        data: {
          title: body.title,
        },
      })
      return todo
    },
    {
      body: TodoPlainInputCreate,
      response: TodoPlain,
    }
  )

  // Update a todo
  .put(
    '/todos/:id',
    async ({ params, body, set }) => {
      const id = Number(params.id)

      try {
        const todo = await prisma.todo.update({
          where: { id },
          data: {
            title: body.title,
            completed: body.completed,
          },
        })
        return todo
      } catch {
        set.status = 404
        return { error: 'Todo not found' }
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      body: TodoPlainInputUpdate,
      response: {
        200: TodoPlain,
        404: t.Object({
          error: t.String(),
        }),
      },
    }
  )

  // Toggle todo completion
  .patch(
    '/todos/:id/toggle',
    async ({ params, set }) => {
      const id = Number(params.id)

      try {
        const todo = await prisma.todo.findUnique({
          where: { id },
        })

        if (!todo) {
          set.status = 404
          return { error: 'Todo not found' }
        }

        const updated = await prisma.todo.update({
          where: { id },
          data: { completed: !todo.completed },
        })

        return updated
      } catch {
        set.status = 404
        return { error: 'Todo not found' }
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      response: {
        200: TodoPlain,
        404: t.Object({
          error: t.String(),
        }),
      },
    }
  )

  // Delete a todo
  .delete(
    '/todos/:id',
    async ({ params, set }) => {
      const id = Number(params.id)

      try {
        const todo = await prisma.todo.delete({
          where: { id },
        })
        return todo
      } catch {
        set.status = 404
        return { error: 'Todo not found' }
      }
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
      response: {
        200: TodoPlain,
        404: t.Object({
          error: t.String(),
        }),
      },
    }
  )

  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
