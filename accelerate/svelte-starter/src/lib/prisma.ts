// place files you want to import through the `$lib` alias in this folder.
import { PrismaClient } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'


const prisma = new PrismaClient().$extends(withAccelerate());

export default prisma