import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/lib/prisma.server'
import Post from '~/components/Post'

export async function loader() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    select: {
      id: true,
      title: true,
      author: true,
    }
  })

  return json({ feed })
}

export default function Index() {
  const { feed } = useLoaderData<typeof loader>()
  return (
    <div className="page">
      <h1>My Blog</h1>
      <main>
        {feed.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}
