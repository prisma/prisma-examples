import prisma from "$lib/prisma";
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    let title = data.get("title")
    let content = data.get("content")
    let authorEmail = { connect: { email: data.get("authorEmail") } }

    if (!title) {
      return fail(400, { content, authorEmail, missing: true });
    }

    if (!content) {
      return fail(400, { title, authorEmail, missing: true });
    }

    if (!authorEmail) {
      return fail(400, { title, content, missing: true });
    }

    const createdPost = await prisma.post.create({
      data: {
        title,
        content,
        author: authorEmail
      },
    });
    console.log("create request:  ", createdPost)

    throw redirect(307, `/drafts`)
  }
};