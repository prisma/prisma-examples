import prisma from '~/lib/prisma'

export default eventHandler(async () => {
  const user = await prisma.user.exists({
    email: 'niko@prisma.io',
  })

  return user ?? 'User not added to the database yet'
})
