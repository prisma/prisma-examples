import { Post } from '@/components/Posts'
import prisma from '@/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Home() {
  const { data, info } = await prisma.post
    .findMany({
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
      cacheStrategy: {
        ttl: 400,
        tags: ['posts'],
      },
    })
    .withAccelerateInfo()

  console.log({ info })

  return (
    <>
      <div className="w-full h-16 flex flex-row bg-[#ff6600] items-center justify-start p-4 gap-4">
        <p className="text-lg font-extrabold text-black">
          Accelerate Hacker News Clone
        </p>
        <a className="text-black cursor-pointer" href="/submit">
          submit
        </a>
      </div>
      <div className="bg-[#f6f6ef] h-full w-full">
        <ol className="p-12 md:p-8 text-black">
          {data.map((post, itemNo) => (
            <li key={post.id} className="mb-4">
              <Post
                id={post.id}
                itemNo={itemNo + 1}
                title={post.title}
                votes={post.vote}
                url={post.url}
              />
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
