import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    res.end("You need to be authenticated to access this route.");
  }

  const posts = await prisma.post.findMany({
    where: {
      published: false,
      author: {
        email: session.user.email,
      },
    },
    include: { author: true },
  });
  res.json(posts);
}
