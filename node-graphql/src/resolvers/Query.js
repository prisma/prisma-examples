export const Query = {
  masters: async (root, args, ctx) => {
    return ctx.db.masters()
  },
};
