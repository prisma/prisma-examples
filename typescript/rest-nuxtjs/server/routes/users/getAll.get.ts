import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
    const getAllUsers = await prisma.user.findMany()
    .catch((error) => {
        console.error(error);

        return false;
    });

    return {
        data: getAllUsers ? getAllUsers : [],
        success: getAllUsers ? true : false
    }
});