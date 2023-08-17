'use client'
import { useRouter } from "next/navigation"
import { PostProps } from "./Post"
import styles from '../styles/Post.module.css'
import ReactMarkdown from 'react-markdown'

export default function PostDetails({ title, author, content, published, id }: PostProps) {
  const router = useRouter()

  async function publish(id: number) {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    })
    router.push('/')
  }

  async function destroy(id: number) {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    router.push('/')
  }

  if (!published) {
    title = `${title} (Draft)`
  }


  return (
    <div>
      <h2>{title}</h2>
      <p>By {author?.name || 'Unknown author'}</p>
      {/* @ts-ignore */}
      <ReactMarkdown>{content}</ReactMarkdown>
      {!published && (
        <button
          className={styles.button} onClick={() => publish(id)}>
          Publish
        </button>
      )}
      <button className={styles.button} onClick={() => destroy(id)}>
        Delete
      </button>
    </div>

  )
}
