'use client'

import { useState } from 'react'

export default function PostInputs() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function createPost(e: React.FormEvent) {
    e.preventDefault()
    if (!title || !content) return

    await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    setTitle('')
    setContent('')
    location.reload()
  }

  return (
    <form onSubmit={createPost} className="space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-zinc-800 rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-zinc-800 rounded"
      />
      <button className="w-full p-2 border border-zinc-800 rounded">
        Post
      </button>
    </form>
  )
}
