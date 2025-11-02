import 'dotenv/config';
import { PrismaClient } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter: pool });

async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: 'Percy Prisma',
      email: 'percy@example.com',
    },
  });
  console.log('The new user:', newUser);

  const users = await prisma.user.findMany();
  console.log('All users:', users);

  // See more examples of how to use Prisma ORM: https://www.prisma.io/docs/getting-started/quickstart
}

main();
