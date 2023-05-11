'use client'

import { notFound } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import styles from './page.module.css'

async function publish(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
}

async function destroy(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
}

export default async function Post({ params }: { params: { id: string } }) {
  const router = useRouter()

  const id = Number(Array.isArray(params.id) ? params.id[0] : params.id)
  const post = await fetch(`/api/post/${id}`, { method: 'GET' }).then((res) =>
    res.json(),
  )

  if (!post) notFound()

  let title = post.title
  if (!post.published) {
    title = `${title} (Draft)`
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {post.author?.name || 'Unknown author'}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      {!post.published && (
        <button
          className={styles.button}
          onClick={() => {
            publish(post.id)
            router.push('/')
          }}
        >
          Publish
        </button>
      )}
      <button
        className={styles.button}
        onClick={() => {
          destroy(post.id)
          router.push('/')
        }}
      >
        Delete
      </button>
    </div>
  )
}
