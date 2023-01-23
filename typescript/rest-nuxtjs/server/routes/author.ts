import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { email } = await readBody(event);

    const user = await prisma.user.findMany({
        where: {
            email: email
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return user;
});