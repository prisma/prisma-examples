import { useRouter } from 'next/router';
import Markdown from 'react-markdown';
import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router'

const Post = props => {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <Layout>
      <div>
        <h2 >{title}</h2>
        <p >
          By {props.author.name || 'Unknown author'}
        </p>
        <p>{props.content}</p>
        {!props.published && <button
          onClick={async e => {
            const res = await fetch(`http://localhost:3000/api/publish/${props.id}`, {
              method: 'PUT'
            })
            const data = await res.json()
            console.log(`published`, data)
            Router.push('/')
          }}
        >Publish</button>}
        <button
          onClick={async e => {
            const res = await fetch(`http://localhost:3000/api/post/${props.id}`, {
              method: 'DELETE'
            })
            const data = await res.json()
            console.log(`deleted`, data)
            Router.push('/')
          }}
        >Delete</button>

      </div>
    </Layout>
  )
};


Post.getInitialProps = async function (context) {
  const res = await fetch(`http://localhost:3000/api/post/${context.query.id}`);
  const data = await res.json();
  return data
}

export default Post;
