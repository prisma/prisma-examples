import "dotenv/config";
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create a user with a post
  const user = await prisma.user.create({
    data: {
      email: `alice${Date.now()}@prisma.io`,
      name: "Alice",
      posts: {
        create: {
          title: "Hello from Prisma Postgres!",
          content: "This is my first post",
          published: true,
        },
      },
    },
    include: { posts: true },
  });
  console.log("Created user with post:", user);

  // Query all published posts
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  });
  console.log("All published posts:", posts);

  // Update a post
  const updatedPost = await prisma.post.update({
    where: { id: user.posts[0].id },
    data: { title: "Hello from Prisma Postgres! (updated)" },
  });
  console.log("Updated post:", updatedPost);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
