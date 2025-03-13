import { prisma } from '~/lib/db'
import { useFetcher, Form } from 'react-router'
import type { Route } from './+types/home'
import { TodoItem } from '~/components/Todo'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')?.toString()

  switch (intent) {
    case 'create': {
      const title = formData.get('text')?.toString()
      if (!title) {
        return { todoError: 'Text is required' }
      }
      try {
        const todo = await prisma.todo.create({ data: { title } })
        console.log('todo', todo)
        return { success: true, todo }
      } catch (error) {
        return { todoError: 'Error adding todo.' }
      }
    }

    case 'update': {
      const id = formData.get('id')?.toString()
      const title = formData.get('title')?.toString()
      const complete = formData.get('complete') === 'true'

      if (!id) return { todoError: 'Todo ID is required' }

      try {
        const todo = await prisma.todo.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(formData.has('complete') && { complete }),
          },
        })
        return { success: true, todo }
      } catch (error) {
        return { todoError: 'Error updating todo.' }
      }
    }

    case 'delete': {
      const id = formData.get('id')?.toString()
      if (!id) return { todoError: 'Todo ID is required' }

      try {
        await prisma.todo.delete({ where: { id } })
        return { success: true }
      } catch (error) {
        return { todoError: 'Error deleting todo.' }
      }
    }

    default:
      return { todoError: 'Invalid action' }
  }
}

export async function loader({ context }: Route.LoaderArgs) {
  const todos = await prisma.todo.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return { todos }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  // const createFetcher = useFetcher()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>

      <Form method="post" action="/" className="mb-8">
        <div className="flex gap-4">
          <input
            name="text"
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 p-2 border rounded"
            // disabled={createFetcher.state !== 'idle'}
          />
          <input type="hidden" name="intent" value="create" />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            // disabled={createFetcher.state !== 'idle'}
          >
            {/* {createFetcher.state !== 'idle' ? 'Adding...' : 'Add Todo'} */}
            Add Todo
          </button>
        </div>
      </Form>

      <div className="space-y-4">
        {loaderData.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}
