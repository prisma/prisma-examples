import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const Post = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author'
  return (
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>
        <h2>{post.title}</h2>
        <small>By {authorName}</small>
        <p>{post.content}</p>
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

const Drafts = props => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.drafts.map(post => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

Drafts.getInitialProps = async function() {
  const res = await fetch('http://localhost:3000/api/drafts')
  const data = await res.json()
  return {
    drafts: data,
  }
}

export default Drafts
