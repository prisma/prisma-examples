import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const PUT: RequestHandler = async ({ params: { id } }) => {
  const updatedPost = await prisma.post.update({
    where: { id: Number(id) },
    data: {
      published: true,
    },
  });

  return json(updatedPost);
};
