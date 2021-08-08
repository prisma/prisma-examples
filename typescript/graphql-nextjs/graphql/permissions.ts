import { rule, shield, or, and, allow } from "graphql-shield"

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null
  }
)

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "admin"
  }
)

const isEditor = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === "editor"
  }
)

const permissions = shield({
  Query: {
    "*": isAuthenticated,
  },
  Mutation: {
    signupUser: allow,
    deletePost: and(isAuthenticated, isAdmin),
    createDraft: or(isAdmin, isEditor),
    publish: or(isAdmin, isEditor),
  },
})

export default permissions
