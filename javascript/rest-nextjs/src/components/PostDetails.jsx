'use client'
import ReactMarkdown from 'react-markdown'
import React from "react"
import { useRouter } from "next/navigation"
import styles from "../styles/Post.module.css";

export default function PostDetails({ title, author, content, published, id }) {
  const router = useRouter()

  async function publish(id) {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    })
    router.push('/')
  }

  async function destroy(id) {
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
