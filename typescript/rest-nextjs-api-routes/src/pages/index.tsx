import React from 'react'
import { GetServerSideProps } from 'next'
import Post, { PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import styles from '@/styles/Blog.module.css'

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>My Blog</h1>
      <main>
        {props.feed.map((post) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  return {
    props: { feed },
  }
}

export default Blog
