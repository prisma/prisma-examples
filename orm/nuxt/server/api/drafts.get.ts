export default defineEventHandler(async () => {
    const drafts = await prisma.post.findMany({
        where: {
            published: false
        },
        include: {
            author: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return drafts
})

