'use client'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import styles from './Post.module.css'
import Link from 'next/link'

const Post = ({ post }) => {

  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <Link
      href={`/p/${post.id}`}
      className={styles.post}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </Link>
  )
}

export default Post
