const { PrismaWeaver } = require("@gqloom/prisma")
const mm = require("./model-meta.json")

const User = PrismaWeaver.unravel(mm.models.User, mm)
const Post = PrismaWeaver.unravel(mm.models.Post, mm)


module.exports = {
  User,
  Post,
}