import { prisma } from '../lib/prisma'
import { Router } from 'express'
import jwt from 'jsonwebtoken'
import argon2 from 'argon2'

export const auth = Router()

auth.post('/signup', async (req, res) => {
  const { email, password, username } = req.body

  if (!email || !password || !username) {
    return res.json({
      success: false,
      error: 'Missing request body properties',
    })
  }

  const result = await prisma.user.findFirst({
    where: {
      username,
    },
  })

  if (result) return res.json({ success: false, error: 'User already exists' })

  const hashedPassword = await argon2.hash(password)

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      username: username,
    },
  })

  const accessToken = jwt.sign({ userID: user.id }, 'secret')

  return res.json({ success: true, accessToken: accessToken })
})

auth.post('/login', async (req, res) => {})

auth.post('/logout', async (req, res) => {})
