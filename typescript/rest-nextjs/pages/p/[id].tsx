import { useRouter } from 'next/router'
import Markdown from 'react-markdown'
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

const Post = props => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p>By {props.author.name || 'Unknown author'}</p>
        <p>{props.content}</p>
        {!props.published && (
          <button
            onClick={async e => {
              const res = await fetch(
                `http://localhost:3000/api/publish/${props.id}`,
                {
                  method: 'PUT',
                }
              )
              const data = await res.json()
              console.log(`published`, data)
              Router.push('/')
            }}>
            Publish
          </button>
        )}
        <button
          onClick={async e => {
            const res = await fetch(
              `http://localhost:3000/api/post/${props.id}`,
              {
                method: 'DELETE',
              }
            )
            const data = await res.json()
            Router.push('/')
          }}>
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

Post.getInitialProps = async function(context) {
  const res = await fetch(`http://localhost:3000/api/post/${context.query.id}`)
  const data = await res.json()
  return data
}

export default Post
