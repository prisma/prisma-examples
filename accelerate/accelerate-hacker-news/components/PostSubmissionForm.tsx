'use client'
import { createPost } from '@/app/submit/actions/addPost'
import { useRef } from 'react'

export const PostForm = () => {
  const ref = useRef<HTMLFormElement>(null)
  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          await createPost(formData)
          ref.current?.reset()
        }}
        className="grid grid-cols-2 max-w-lg p-4 space-y-2 space-x-1"
      >
        <label
          className="text-sm font-medium text-gray-700  place-self-start self-end"
          htmlFor="title"
        >
          title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          // Controlled input
          className="text-black border border-gray-300 bg-white rounded-md p-2"
        />

        <label
          className="text-sm font-medium text-gray-700 place-self-start self-end"
          htmlFor="url"
        >
          url
        </label>
        <input
          id="url"
          type="text"
          name="url"
          required
          className="text-black border bg-white border-gray-300 rounded-md p-2"
        />

        <label
          className="text-sm font-medium text-gray-700 place-self-start self-end"
          htmlFor="text"
        >
          text
        </label>
        <textarea
          id="text"
          name="text"
          required
          className="text-black border border-gray-300 bg-white rounded-md p-2"
          rows={4}
        />
        <div></div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </>
  )
}
