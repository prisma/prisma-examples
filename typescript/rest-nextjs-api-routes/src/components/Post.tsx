import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import styles from '@/components/Post.module.css'

export type PostProps = {
  id: number
  title: string
  author: {
    name: string
  }
  content: string
  published: boolean
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div
      className={styles.post}
      onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}
    >
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </div>
  )
}

export default Post
