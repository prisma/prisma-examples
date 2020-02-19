const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

module.exports = async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
}
