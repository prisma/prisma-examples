export const Query = {
  masters: (root, args, ctx, info) => ctx.db.$delegate.query.masters(args, info)
}
