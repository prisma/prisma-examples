import prisma from '$lib/prisma'

export async function post({ request }) {
  const data = await request.json()
  const result = await prisma.user.create({ data })

  return { body: result }
}
