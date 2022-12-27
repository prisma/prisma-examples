import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    const { first_name, last_name } = await readBody(event);

    const addUser = await prisma.user.create({
        data: {
            first_name,
            last_name
        }
    })
    .catch((error) => {
        console.error(error);

        return false
    });
    
    return {
        data: addUser ? addUser : {},
        success: addUser ? true : false
    }
});