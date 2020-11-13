import Hapi from '@hapi/hapi'
import { UserCreateInput } from '@prisma/client'


// plugin to instantiate Prisma Client
const usersPlugin = {
  name: 'app/users',
  dependencies: ['prisma'],
  register: async function(server: Hapi.Server) {

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

async function createUserHandler(request: Hapi.Request, h: Hapi.ResponseToolkit) {
  const { prisma } = request.server.app
  const payload = request.payload as UserCreateInput

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