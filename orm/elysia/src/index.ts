import { PrismaPg } from "@prisma/adapter-pg";
import { Elysia, t } from "elysia";
import { Pool } from "pg";
import { PrismaClient } from "../prisma/generated/client/client";
import {
	UserPlain,
	UserPlainInputCreate,
} from "../prisma/generated/prismabox/User";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const app = new Elysia()
	.put(
		"/",
		async ({ body }) =>
			prisma.user.create({
				data: body,
			}),
		{
			body: UserPlainInputCreate,
			response: UserPlain,
		},
	)
	.get(
		"/id/:id",
		async ({ params: { id }, status }) => {
			const user = await prisma.user.findUnique({
				where: { id: Number(id) },
			});

			if (!user) return status(404, "User not found");

			return user;
		},
		{
			response: {
				200: UserPlain,
				404: t.String(),
			},
		},
	)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
