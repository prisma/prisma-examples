import Layout from "../components/Layout"
import Link from "next/link"
import gql from "graphql-tag"
import client from "../lib/apollo-client"

const Post = ({ post }) => (
  <Link href="/p/[id]" as={`/p/${post.id}`} legacyBehavior>
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

const Drafts = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.data.drafts.map(post => (
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

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
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
    `,
  });

  return {
    props: {
      data
    },
  };
}

export default Drafts
