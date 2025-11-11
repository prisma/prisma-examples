// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '../../prisma/generated/client'


const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL,
});

export default prisma