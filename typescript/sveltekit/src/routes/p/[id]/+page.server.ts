import prisma from "$lib/prisma";
import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ params: { id } }: { params: { id: Number } }) => {
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: { author: true },
  });

  return { post };
};

/** @type {import('./$types').Actions} */
export const actions = {
  publishPost: async ({ params: { id } }: { params: { id: Number } }) => {
    await prisma.post.update({
      where: { id: Number(id) },
      data: {
        published: true,
      },
    });

    throw redirect(303, `/p/${id}`);
  },

  deletePost: async ({ params: { id } }: { params: { id: Number } }) => {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    throw redirect(303, '/')
  }
};