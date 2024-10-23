import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params: { id } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });

  return json(post);
};

export const DELETE: RequestHandler = async ({ params: { id } }) => {
  const deletedPost = await prisma.post.delete({
    where: { id: Number(id) },
  });

  return json(deletedPost);
};
