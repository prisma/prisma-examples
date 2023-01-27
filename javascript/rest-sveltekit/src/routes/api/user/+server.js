import prisma from '$lib/prisma'
import { json } from '@sveltejs/kit'

export const POST = async ({ request }) => {
  const { name, email } = await request.json()
  const createdUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  })

  return json(createdUser)
}
