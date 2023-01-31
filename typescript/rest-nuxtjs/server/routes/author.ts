import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { email } = await readBody(event);

    try {
        const user = await prisma.user.findMany({
            where: {
                email: email
            }
        });

        return user;
    }
    catch(error) {
        console.error(error);
    }
});