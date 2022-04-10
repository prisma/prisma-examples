import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import { useQuery } from "@apollo/client"
import type { DraftsQuery, DraftsQueryVariables } from "../generated/graphql"

const Query = gql`
  query Drafts {
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

type Drafts = DraftsQuery["drafts"]
type Draft = NonNullable<Drafts>[number]

const Post = ({ post }: { post: Draft }) =>
  post && (
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>
        <h2>{post.title}</h2>
        <small>By {post.author ? post.author.name : "Unknown Author"}</small>
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

const Drafts = () => {
  const { loading, error, data } = useQuery<DraftsQuery, DraftsQueryVariables>(
    Query,
    {
      fetchPolicy: "cache-and-network",
    }
  )

  if (loading) {
    return <div>Loading ...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {data?.drafts?.map(
            post =>
              post && (
                <div key={post.id} className="post">
                  <Post post={post} />
                </div>
              )
          )}
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

export default Drafts
