import prisma from '$lib/prisma';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
  const response = await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
  })
  
  return { feed: response };
};