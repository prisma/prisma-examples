import Post, { PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import styles from './page.module.css'

export default async function Blog() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })

  return (
    <div>
      <h1>My Blog</h1>
      <main>
        {feed.map((post) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  )
}
