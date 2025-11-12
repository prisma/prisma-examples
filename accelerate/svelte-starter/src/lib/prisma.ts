// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '../../prisma/generated/client'
import { withAccelerate } from '@prisma/extension-accelerate'


const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
}).$extends(withAccelerate());

export default prisma