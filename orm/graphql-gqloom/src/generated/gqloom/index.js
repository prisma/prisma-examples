import { PrismaWeaver } from "@gqloom/prisma"
import mm from "./model-meta.json" with { type: "json" }

const User = PrismaWeaver.unravel(mm.models.User, mm)
const Post = PrismaWeaver.unravel(mm.models.Post, mm)


export {
  User,
  Post,
}