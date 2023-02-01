import React from 'react'
import { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../lib/prisma'
import styles from '@/styles/Drafts.module.css'

type Props = {
  drafts: PostProps[]
}

const Drafts: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Drafts</h1>
        <main>
          {props.drafts.map((post) => (
            <div key={post.id} className={styles.post}>
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })
  return {
    props: { drafts },
  }
}

export default Drafts
