import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const feed = await prisma.post.findMany({
        where: { 
            published: true
        },
        include: {
            author: true
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return feed;
});
