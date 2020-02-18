import { useRouter } from 'next/router'
import Markdown from 'react-markdown'
import Layout from '../../components/Layout'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

async function publish(id) {
  const res = await fetch(`http://localhost:3000/api/publish/${id}`, {
    method: 'PUT',
  })
  const data = await res.json()
  await Router.push('/')
}

async function destroy(id) {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    method: 'DELETE',
  })
  const data = await res.json()
  Router.push('/')
}

const Post = props => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }
  const authorName = props.author ? props.author.name : 'Unknown author'
  return (
    <Layout>
      <div className="page">
        <h2>{title}</h2>
        <small>By {authorName}</small>
        <p>{props.content}</p>
        <div className="actions">
          {!props.published && (
            <button onClick={() => publish(props.id)}>Publish</button>
          )}
          <button onClick={() => destroy(props.id)}>Delete</button>
        </div>
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
