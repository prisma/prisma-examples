import { prisma } from '../generated/prisma-client'

test('Resolve users', async () => {
    const users = await prisma.users()
    expect(users.length).toBe(1)
    expect(users[0].name).toBe('Alice')
})