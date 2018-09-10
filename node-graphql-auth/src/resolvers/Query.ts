import { getUserId } from "../utils";

export const Query = {
  me: (_, {}, ctx) => {
    return ctx.db.user({ id: getUserId(ctx) });
  }
};
