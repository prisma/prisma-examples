import { getDb } from '../../../prisma/db'

export async function GET() {
  const users = await getDb()
    .orm.public.User.include('posts')
    .orderBy((user) => user.createdAt.desc())
    .all()

  return Response.json(users)
}
