import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const { searchString } = getQuery(event);

    const draftPosts = await prisma.post.findMany({
        where: {
            OR: [
              {
                title: {
                    //@ts-ignore
                    contains: searchString,
                },
              },
              {
                content: {
                    //@ts-ignore
                    contains: searchString,
                },
              },
            ],
        },
    })
    .catch((error) => {
        console.error(error);
    });

    return draftPosts;
});
