'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import styles from '@/components/Post.module.css'
import { Post as PrismaPost, Post, User } from '@prisma/client'
import { tmpdir } from 'os'

export type PostProps = Pick<
  PrismaPost,
  'id' | 'title' | 'content' | 'published'
> & {
  author: Pick<User, 'name'> | null
}

export default function Post({ post }: { post: PostProps }) {
  const router = useRouter()

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div className={styles.post} onClick={() => router.push(`/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  )
}
