import Hapi from '@hapi/hapi'
/*
 * TODO: We can't use this type because it is available only in 2.11.0 and previous versions
 * In 2.12.0, this will be namespaced under Prisma and can be used as Prisma.UserCreateInput
 * Once 2.12.0 is release, we can adjust this example.
 */
// import { UserCreateInput } from '@prisma/client'

// plugin to instantiate Prisma Client
const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: 'POST',
        path: '/user',
        handler: createUserHandler,
      },
    ])
  },
}

export default usersPlugin

async function createUserHandler(
  request: Hapi.Request,
  h: Hapi.ResponseToolkit,
) {
  const { prisma } = request.server.app
  // const payload = request.payload as UserCreateInput
  const payload = request.payload as any

  try {
    const createdUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
      },
      select: {
        id: true,
      },
    })
    return h.response(createdUser).code(201)
  } catch (err) {
    console.log(err)
  }
}
