import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>
        <h2>{post.title}</h2>
        <small>By {authorName}</small>
        <ReactMarkdown source={post.content} />
        <style jsx>{`
          a {
            text-decoration: none;
            color: inherit;
            padding: 2rem;
            display: block;
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Post