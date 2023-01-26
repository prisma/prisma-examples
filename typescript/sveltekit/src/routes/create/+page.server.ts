import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    let title = data.get("title")
    let content = data.get("content")
    let authorEmail = data.get("authorEmail")

    if (!title || !content || !authorEmail) {
      return fail(400, { content, authorEmail, title, missing: true });
    }

    await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: authorEmail } }
      },
    });

    throw redirect(303, `/drafts`)
  }
};