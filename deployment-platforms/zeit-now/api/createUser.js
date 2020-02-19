const { PrismaClient, PrismaClientRequestError } = require('@prisma/client')
const prisma = new PrismaClient()

// app.delete('/users/:id', async (req, res) => {
//   // let users = await prisma.user.findMany()
//   res.status(200).send(users)
// })

module.exports = async (req, res) => {
  try {
    const createdUser = await prisma.user.create({
      data: req.body
    })
    res.status(200).json(createdUser)
  } catch (e) {
    if (e instanceof PrismaClientRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A user with this email already exists' })
      }
    }
    console.error(e)
    return res.status(500)
  }
}
