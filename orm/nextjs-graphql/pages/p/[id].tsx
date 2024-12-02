import Layout from "../../components/Layout"
import Router, { useRouter } from "next/router"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import client from "../../lib/apollo-client"
import { PostProps } from "../../components/Post"
import { GetServerSideProps } from "next"

const PublishMutation = gql`
  mutation PublishMutation($id: ID!) {
    publish(id: $id) {
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

const DeleteMutation = gql`
  mutation DeleteMutation($id: ID!) {
    deletePost(id: $id) {
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

const Post: React.FC<{ data: { post: PostProps } }> = (props) => {
  const id = useRouter().query.id

  const [publish] = useMutation(PublishMutation)
  const [deletePost] = useMutation(DeleteMutation)

  let title = props.data.post.title
  if (!props.data.post.published) {
    title = `${title} (Draft)`
  }

  const authorName = props.data.post.author ? props.data.post.author.name : "Unknown author"
  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {authorName}</p>
        <p>{props.data.post.content}</p>
        {!props.data.post.published && (
          <button
            onClick={async e => {
              await publish({
                variables: {
                  id,
                },
              })
              Router.push("/")
            }}
          >
            Publish
          </button>
        )}
        <button
          onClick={async e => {
            await deletePost({
              variables: {
                id,
              },
            })
            Router.push("/")
          }}
        >
          Delete
        </button>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(Array.isArray(context.params?.id) ? context.params?.id[0] : context.params?.id)
  const { data } = await client.query({
    query: gql`
      query PostQuery($id: ID!) {
        post(id: $id) {
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
    variables: { id },
  });

  return {
    props: {
      data
    },
  };
}

export default Post
