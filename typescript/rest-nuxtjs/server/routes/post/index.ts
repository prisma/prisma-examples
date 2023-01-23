import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { title, content, authorEmail } = await readBody(event);

    const createPost = await prisma.post.create({
        data: {
            title,
            content,
            published: false,
            author: {
                connect: {
                    email: authorEmail
                }
            }
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createPost;
});