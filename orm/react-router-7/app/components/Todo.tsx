import { useFetcher } from 'react-router'
import type { Todo } from '@prisma/client'

type TodoProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoProps) {
  const updateFetcher = useFetcher()
  const deleteFetcher = useFetcher()

  return (
    <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <updateFetcher.Form
        method="PATCH"
        className="flex items-center gap-4 flex-1"
        onChange={(e) =>
          updateFetcher.submit(e.currentTarget, { method: 'PATCH' })
        }
      >
        <input type="hidden" name="id" value={todo.id} />
        <input
          type="checkbox"
          name="complete"
          defaultChecked={todo.complete}
          className="w-5 h-5"
        />
        <span
          className={`flex-1 text-gray-900 dark:text-gray-100 ${
            todo.complete ? 'line-through text-gray-500 dark:text-gray-400' : ''
          }`}
        >
          {todo.title}
        </span>
      </updateFetcher.Form>

      <deleteFetcher.Form method="DELETE">
        <input type="hidden" name="id" value={todo.id} />
        <button
          type="submit"
          className="px-2 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
        >
          Delete
        </button>
      </deleteFetcher.Form>
    </div>
  )
}
