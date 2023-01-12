import { fail } from '@sveltejs/kit';
import prisma from "$lib/prisma";
import { redirect } from '@sveltejs/kit';


/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    let name = data.get("name")
    let userEmail = data.get("userEmail")

    if (!name) {
      return fail(400, { userEmail, missing: true });
    }

    if (!userEmail) {
      return fail(400, { name, missing: true });
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail))) {
      return fail(400, { name, incorrect: true });
    }

    const createdUser = await prisma.user.create({
      data: {
        name,
        email: userEmail,
      },
    });

    console.log("create request:  ", createdUser)
    throw redirect(307, `/drafts`)
  }
};