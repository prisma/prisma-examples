import ReactMarkdown from 'react-markdown'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { makeSerializable } from '../../lib/util'
import prisma from '../../lib/prisma';

async function publish(id) {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id) {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
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
        <ReactMarkdown children={props.content} />
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

export const getServerSideProps = async (context) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(context.params.id) },
    include: { author: true },
  })
  return { props: { ...makeSerializable(post) } }
}

export default Post
