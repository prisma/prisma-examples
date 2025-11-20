import { PrismaClient } from './generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

export interface Env {
	DATABASE_URL: string;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const path = new URL(request.url).pathname;
		if (path === '/favicon.ico')
			return new Response('Resource not found', {
				status: 404,
				headers: {
					'Content-Type': 'text/plain',
				},
			});

		const adapter = new PrismaPg({
			connectionString: env.DATABASE_URL,
		});

		const prisma = new PrismaClient({
			adapter,
		});

		const user = await prisma.user.create({
			data: {
				email: `Prisma-Postgres-User-${Math.ceil(Math.random() * 1000)}@gmail.com`,
				name: 'Jon Doe',
			},
		});

		const userCount = await prisma.user.count();

		return new Response(`\
      Created new user: ${user.name} (${user.email}).
      Number of users in the database: ${userCount}.
    `);
	},
} satisfies ExportedHandler<Env>;
