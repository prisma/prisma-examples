import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request }) => {
  const { name, email } = await request.json();
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return json(createdUser);
};
