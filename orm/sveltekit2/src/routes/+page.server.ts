import prisma from '$lib/prisma';

export async function load() {
	const users = await prisma.user.findMany({
		include: {
			posts: true
		}
	});

	return {
		users
	};
}
