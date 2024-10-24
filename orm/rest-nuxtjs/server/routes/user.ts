import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    // https://nuxt.com/docs/guide/directory-structure/server#handling-requests-with-body
    const { name, email } = await readBody(event);

    const createUser = await prisma.user.create({
        data: {
           name,
           email
        }
    })
    .catch((error) => {
        console.error(error);
    });

    return createUser;
});