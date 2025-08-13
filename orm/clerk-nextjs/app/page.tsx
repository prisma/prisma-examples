import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import PostInputs from "@/app/components/PostInputs";

export default async function Home() {
  const user = await currentUser();
  if (!user) return <div className="flex justify-center">Sign in to post</div>;

  const posts = await prisma.post.findMany({
    where: { author: { clerkId: user.id } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="max-w-2xl mx-auto p-4">
      <PostInputs />
      <div className="mt-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border border-zinc-800 rounded mt-4">
            <h2 className="font-bold">{post.title}</h2>
            <p className="mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}