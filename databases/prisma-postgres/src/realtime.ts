import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';

process.on('SIGINT', () => {
  process.exit(0);
});

const apiKey: string = process.env.PULSE_API_KEY ?? '';
if (!apiKey || apiKey === "") {
  console.log(`Please set the \`PULSE_API_KEY\` environment variable in the \`.env\` file.`);
  process.exit(1);
}

const prisma = new PrismaClient().$extends(
  withPulse({ apiKey: apiKey })
);

async function main() {
  const stream = await prisma.user.stream();

  process.on('exit', () => {
    stream.stop();
  });

  console.log(`Waiting for an event on the \`User\` table ... `);
  for await (const event of stream) {
    console.log('Received an event:', event);
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
