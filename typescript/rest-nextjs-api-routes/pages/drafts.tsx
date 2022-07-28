import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import absoluteUrl from "next-absolute-url"

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Drafts</h1>
        <main>
          {props.drafts.map((post) => (
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { origin } = absoluteUrl(req)
  const res = await fetch(`${origin}/api/drafts`)
  const drafts = await res.json()
  return {
    props: { drafts },
  }
}

export default Drafts
