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
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        published: true,
      },
    });

    console.log("PUBLISHED :  ", updatedPost)
    throw redirect(307, `/p/${id}`);
  },

  deletePost: async ({ params: { id } }: { params: { id: Number } }) => {
    const deletedPost = await prisma.post.delete({
      where: { id: Number(id) },
    });

    console.log("DELETED :  ", deletedPost)
    throw redirect(307, '/')
  }
};