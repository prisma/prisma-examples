import { prisma } from '../lib/prisma'
import { Router } from 'express'
import argon2 from 'argon2'

export const auth = Router()

auth.post('/signup', async (req, res) => {
  const { email, password, name } = req.body

  const result = await prisma.user.findUnique({
    where: {
      name,
    },
  })

  if (result) return res.json({ success: false, error: 'User already exists' })

  if (result)
    return res
      .status(400)
      .json({ success: false, error: 'User already exists' })

  const hashedPassword = await argon2.hash(password)

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      name: name,
      sessionKey: '',
    },
  })
})

auth.post('/login', async (req, res) => {})

auth.post('/logout', async (req, res) => {})
