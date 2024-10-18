import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';

process.on('SIGINT', () => {
  process.exit(0);
});

const apiKey: string = process.env.PULSE_API_KEY ?? '';
console.log(`api key: `, apiKey);

const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: apiKey })
);

async function main() {
  const stream = await prisma.user.stream();

  process.on('exit', () => {
    stream.stop();
  });

  console.log(`waiting for an event ... `);
  for await (const event of stream) {
    console.log('just received an event:', event);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });