import { PrismaClient } from '@prisma/client';
import { withPulse } from '@prisma/extension-pulse';
import { Inngest } from 'inngest';

const apiKey: string = process.env.PULSE_API_KEY ?? '';
const prisma = new PrismaClient().$extends(withPulse({ apiKey }));

const eventKey: string = process.env.INNGEST_EVENT_KEY ?? '';
const inngest = new Inngest({ id: 'pulse-inngest-router', eventKey });

process.on('SIGINT', () => {
  process.exit(0);
});

// Here configure each prisma model to stream changes from
const PRISMA_MODELS = ['notification', 'user'];

async function handleStream(stream: AsyncIterable<any>, model: string): Promise<void> {
  console.log('Streaming events from', model);
  
  for await (const event of stream) {
    console.log(`Event from ${model}:`, event);

    await inngest.send({
      id: event.id,
      name: `db/${model}.${event.action}`,
      data: event,
    });
  }
}

async function main() {
  const streams: Promise<void>[] = [];

  for (const model of PRISMA_MODELS) {
    if (!Object.keys(prisma).includes(model)) {
      console.log(`Model not found in Prisma client (${model}). Skipping...`);
      continue;
    }

    const stream = await (prisma as any)[model].stream({ name: `stream-${model}` });
    streams.push(handleStream(stream, model));

    process.on('exit', (code) => {
      console.log('Stopping stream', model);
      stream.stop();
    });
  }

  await Promise.all(streams);
}

main();
