import Layout from "../components/Layout"
import gql from "graphql-tag"
import client from "../lib/apollo-client"
import Post, { PostProps } from "../components/Post"


const Drafts: React.FC<{ data: { drafts: PostProps[] } }> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.data.drafts.map((post) => (
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

export const getServerSideProps = async () => {
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
