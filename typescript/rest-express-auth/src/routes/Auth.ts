import { prisma } from '../lib/prisma'
import { Router } from 'express'

export const auth = Router()

auth.post('/signup', async (req, res) => {})

auth.post('/login', async (req, res) => {})

auth.post('/logout', async (req, res) => {})
