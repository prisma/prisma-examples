import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

const Drafts = props => {

  return (
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {props.drafts.map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}

Drafts.getInitialProps = async function () {
  const res = await fetch('http://localhost:3000/api/drafts')
  const data = await res.json()
  return {
    drafts: data
  }
}

export default Drafts