import "dotenv/config";
import { PrismaClient } from '../prisma/generated/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export interface Context {
  prisma: typeof prisma;
}

export const context: Context = {
  prisma: prisma,
};
