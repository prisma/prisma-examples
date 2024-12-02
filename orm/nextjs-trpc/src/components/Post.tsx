import React from 'react'
import Router from 'next/router'
import ReactMarkdown from 'react-markdown'
import type { Post, User } from '@prisma/client';

export type PostProps = {
  post: Post & {
    author: User | null;
  }
}

const Post: React.FC<PostProps> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <div onClick={() => Router.push('/p/[id]', `/p/${post.id}`)}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
      <ReactMarkdown children={post.content ? post.content : ''} />
      <style jsx>{`
          div {
            color: inherit;
            padding: 2rem;
          }
        `}</style>
    </div>
  )
}

export default Post