export default defineEventHandler(async (event) => {
    const body = await readBody<{
        email: string
    }>(event)

    if (!body.email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: body.email
        }
    })

    return { exists: !!user }
})

