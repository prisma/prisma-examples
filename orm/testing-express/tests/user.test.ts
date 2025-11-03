import { test, expect, afterAll, beforeEach } from '@jest/globals'
import request from 'supertest'
import { app, prisma } from '../src/app.js'

beforeEach(async () => {
  // Clean up the database before each test
  await prisma.user.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})

const user = {
  name: 'user 1',
  email: 'user1@a.com',
}

test('a user is added successfully', async () => {
  const response = await request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(response.body.id).toBeDefined()
  expect(response.body.name).toBe(user.name)
  expect(response.body.email).toBe(user.email)
}, 60000)

test('a user with the same email is rejected', async () => {
  // First, create a user
  await request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')
    .expect(200)

  // Then try to create another user with the same email
  const duplicateResponse = await request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')

  expect(duplicateResponse.status).toBe(409)
  expect(duplicateResponse.body.error).toBe('User already exists!')
}, 60000)

test('correct list of users returned', async () => {
  // Create multiple users
  const users = [
    { name: 'user 1', email: 'user1@a.com' },
    { name: 'user 2', email: 'user2@a.com' },
    { name: 'user 3', email: 'user3@a.com' }
  ]

  for (const userData of users) {
    await request(app)
      .post('/user')
      .send(userData)
      .set('Accept', 'application/json')
      .expect(200)
  }

  // Get all users
  const response = await request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(response.body).toBeDefined()
  expect(response.body.length).toBe(3)
  expect(response.body[0].email).toBeDefined()
  expect(response.body[1].email).toBeDefined()
  expect(response.body[2].email).toBeDefined()
}, 60000)
