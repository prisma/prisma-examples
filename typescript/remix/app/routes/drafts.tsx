import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/lib/prisma.server'
import Post from '~/components/Post'

export async function loader() {
  const drafts = await prisma.post.findMany({
    where: { published: false },
    select: {
      id: true,
      title: true,
      author: true
    }
  })

  return json({ drafts })
}

export default function Index() {
  const { drafts } = useLoaderData<typeof loader>()
  return (
    <div className="page">
      <h1>My Blog</h1>
      <main>
        {drafts.map((post) => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}
