import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url }) => {
  const searchString = url.searchParams.get("searchString") ?? undefined;
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          title: { contains: searchString },
        },
        {
          content: { contains: searchString },
        },
      ],
    },
  });

  return json(posts);
};
