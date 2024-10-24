'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Post.module.css'
import Link from 'next/link'
import type { Post, User } from '@prisma/client'

export type PostProps = Post & {
  author: User | null
}

export default function Post({ post }: { post: PostProps }) {

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <Link
      href={`/p/${post.id}`}
      className={styles.post}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      {/* @ts-ignore */}
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </Link>
  )
}
