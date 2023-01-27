import { Link } from '@remix-run/react';
import React from 'react'

export type PostProps = {
  id: number
  title: string;
  author: {
    name: string | null;
  } | null;
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';

  return (
    <Link to={`/p/${post.id}`} style={{
      color: 'inherit',
      margin: "2rem"
    }}>
      <h2>{post.title}</h2>
      <small>By {authorName}</small>
    </Link>
  )
}

export default Post