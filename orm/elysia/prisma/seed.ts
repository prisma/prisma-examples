import { PrismaClient } from '../src/generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set')
}

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const todoData = [
    { title: 'Learn Elysia' },
    { title: 'Learn Prisma' },
    { title: 'Build something awesome', completed: true },
]

async function main() {
    console.log('Start seeding...')
    for (const todo of todoData) {
        const created = await prisma.todo.create({
            data: todo,
        })
        console.log(`Created todo with id: ${created.id}`)
    }
    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
