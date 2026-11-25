import { rule } from 'graphql-guard'
import { getUserId } from '../utils'
import { Context } from '../context'

const rules = {
  isAuthenticatedUser: rule()((_parent, _args, context: Context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  isPostOwner: rule()(async (_parent, args, context) => {
    const userId = getUserId(context)

    const post = await context.prisma.post.findUnique({
      where: {
        id: Number(args.id),
      },
      include: {
        author: true,
      },
    })

    return userId === post.author.id
  }),
}

export const permissions = {
  Query: {
    me: rules.isAuthenticatedUser,
    draftsByUser: rules.isAuthenticatedUser,
    postById: rules.isAuthenticatedUser,
  },
  Mutation: {
    createDraft: rules.isAuthenticatedUser,
    deletePost: rules.isPostOwner,
    incrementPostViewCount: rules.isAuthenticatedUser,
    togglePublishPost: rules.isPostOwner,
  },
}
