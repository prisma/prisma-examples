import { createFileRoute } from '@tanstack/react-router'

import { getDb } from '../../prisma/db'

export const Route = createFileRoute('/api/users')({
  server: {
    handlers: {
      GET: async () => {
        const users = await getDb()
          .orm.public.User.include('posts')
          .orderBy((user) => user.createdAt.desc())
          .all()

        return Response.json(users)
      },
    },
  },
})
