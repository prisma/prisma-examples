import Layout from '../../components/Layout'
import Router, { useRouter } from 'next/router'
import { withApollo } from '../../apollo/client'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'

const PostQuery = gql`
  query PostQuery($postId: ID!) {
    post(postId: $postId) {
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

const PublishMutation = gql`
  mutation PublishMutation($postId: ID!) {
    publish(postId: $postId) {
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
  mutation DeleteMutation($postId: ID!) {
    deletePost(postId: $postId) {
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

function Post() {
  const postId = useRouter().query.id
  const { loading, error, data } = useQuery(PostQuery, {
    variables: { postId },
  })

  const [publish] = useMutation(PublishMutation)
  const [deletePost] = useMutation(DeleteMutation)

  if (loading) {
    console.log('loading')
    return <div>Loading ...</div>
  }
  if (error) {
    console.log('error')
    return <div>Error: {error.message}</div>
  }

  console.log(`response`, data)


  let title = data.post.title
  if (!data.post.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {data.post.author.name || 'Unknown author'}</p>
        <p>{data.post.content}</p>
        {!data.post.published && (
          <button
            onClick={async e => {
              await publish({
                variables: {
                  postId,
                },
              })
              Router.push('/')
            }}
          >
            Publish
          </button>
        )}
        <button
          onClick={async e => {
            await deletePost({
              variables: {
                postId,
              },
            })
            Router.push('/')
          }}
        >
          Delete
        </button>
      </div>
    </Layout>
  )
}

export default withApollo(Post)
