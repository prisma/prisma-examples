import { useState } from 'react'
import { useFetcher } from 'react-router'
import type { Todo } from '@prisma/client'

type TodoProps = {
  todo: Todo
}

export function TodoItem({ todo }: TodoProps) {
  const updateFetcher = useFetcher()
  const deleteFetcher = useFetcher()
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(todo.title)

  // optimistic ui for completion status
  const isComplete = updateFetcher.formData
    ? updateFetcher.formData.get('complete') === 'true'
    : todo.complete

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
      <updateFetcher.Form
        method="post"
        action="/home"
        className="flex items-center gap-4 flex-1"
      >
        <input type="hidden" name="intent" value="update" />
        <input type="hidden" name="id" value={todo.id} />
        <input
          type="checkbox"
          name="complete"
          checked={isComplete}
          onChange={(e) => (e.target as HTMLInputElement).form?.requestSubmit()}
          value="true"
          className="w-5 h-5"
          disabled={updateFetcher.state !== 'idle'}
        />
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => {
              ;(e.target as HTMLInputElement).form?.requestSubmit()
              setIsEditing(false)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                ;(e.target as HTMLInputElement).form?.requestSubmit()
                setIsEditing(false)
              }
            }}
            className="flex-1 p-1 border rounded"
            autoFocus
            disabled={updateFetcher.state !== 'idle'}
          />
        ) : (
          <span
            onClick={() => setIsEditing(true)}
            className={`flex-1 cursor-pointer ${
              isComplete ? 'line-through text-gray-500' : ''
            }`}
          >
            {title}
          </span>
        )}
      </updateFetcher.Form>

      <deleteFetcher.Form method="post" action="/home">
        <input type="hidden" name="intent" value="delete" />
        <input type="hidden" name="id" value={todo.id} />
        <button
          type="submit"
          className="px-2 py-1 text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
          disabled={deleteFetcher.state !== 'idle'}
        >
          {deleteFetcher.state !== 'idle' ? 'Deleting...' : 'Delete'}
        </button>
      </deleteFetcher.Form>
    </div>
  )
}
