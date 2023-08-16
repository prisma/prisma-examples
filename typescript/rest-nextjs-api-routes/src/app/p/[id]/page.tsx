'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import { notFound, } from 'next/navigation'
import { useRouter } from 'next/navigation'
import prisma from '../../../lib/prisma'
import styles from '../../../styles/Post.module.css'

export default async function Post({ params }: { params: { id: string } }) {
  const router = useRouter()
  console.log({ params })
  const id = Number(
    Array.isArray(params?.id)
      ? params?.id[0]
      : params?.id,
  )
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })

  if (!post) notFound()

  async function publish(id: number): Promise<void> {
    await fetch(`/api/publish/${id}`, {
      method: 'PUT',
    })
    router.push('/')
  }

  async function destroy(id: number): Promise<void> {
    await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    })
    router.push('/')
  }

  let title = post.title
  if (!post.published) {
    title = `${title} (Draft)`
  }

  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>By {post?.author?.name || 'Unknown author'}</p>
        {/* @ts-ignore */}
        <ReactMarkdown>{post.content}</ReactMarkdown>
        {!post.published && (
          <button
            className={styles.button} onClick={() => publish(post.id)}>
            Publish
          </button>
        )}
        <button className={styles.button} onClick={() => destroy(post.id)}>
          Delete
        </button>
      </div>
    </>
  )
}


