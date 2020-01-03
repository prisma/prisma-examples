import Layout from '../components/Layout'
import Link from 'next/link'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.title}</a>
    </Link>
  </li>
)

const Drafts = () => {

  const { loading, error, data } = useQuery(DraftsQuery)

  if (loading) {
    return <div>Loading ...</div>
  } 
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Layout>
      <h1>My Blog (Drafts)</h1>
      <ul>
        {data.drafts.map(post => (
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

export default withApollo(Drafts)
