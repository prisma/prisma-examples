import { prisma } from '~/lib/db'
import { Form } from 'react-router'
import type { Route } from './+types/home'
import { TodoItem } from '~/components/Todo'

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')?.toString()

  switch (intent) {
    case 'create': {
      const title = formData.get('text')?.toString()
      if (!title) return null
      return await prisma.todo.create({ data: { title } })
    }

    case 'update': {
      const id = formData.get('id')?.toString()
      const complete = formData.get('complete') === 'true'
      if (!id) return null
      return await prisma.todo.update({
        where: { id },
        data: { complete },
      })
    }

    case 'delete': {
      const id = formData.get('id')?.toString()
      if (!id) return null
      return await prisma.todo.delete({ where: { id } })
    }

    default:
      return null
  }
}

export async function loader() {
  return {
    todos: await prisma.todo.findMany({
      orderBy: { createdAt: 'asc' },
    }),
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Todo List
      </h1>

      <Form method="post" className="mb-8">
        <div className="flex gap-4">
          <input
            name="text"
            type="text"
            placeholder="What needs to be done?"
            className="flex-1 p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <input type="hidden" name="intent" value="create" />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Todo
          </button>
        </div>
      </Form>

      <div className="space-y-4">
        {loaderData.todos.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-8">
            No todos yet. Add one above!
          </p>
        ) : (
          loaderData.todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </div>
  )
}
