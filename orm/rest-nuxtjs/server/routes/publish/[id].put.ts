import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const id = event.context.params.id;

    const updatePost = await prisma.post.update({
        where: {
            id: parseInt(id)
        },
        data: {
            published: true
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return updatePost;
});