import { prisma } from '../../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const { context: { params: { id } } } = event;
   
    const getPost = await prisma.post.findUnique({
        where: {
            //@ts-ignore
            id: parseInt(id) 
        },
        include: { 
            author: true
        } 
    })
    .catch((error) => {
        console.error(error);
    });

    return getPost;
});