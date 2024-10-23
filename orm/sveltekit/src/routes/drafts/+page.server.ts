import prisma from '$lib/prisma';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
  const response = await prisma.post.findMany({
    where: { published: false },
    include: { author: true },
  })

  return { drafts: response };
};
