import request from 'supertest'
import { app, prisma } from '../src/app'

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
})

test('a user with the same email is rejected', () => {
  return request(app)
    .post('/user')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(409)
})

test('correct list of users returned', async () => {
  const response = await request(app)
    .get('/user')
    .expect('Content-Type', /json/)
    .expect(200)

  expect(response.body).toBeDefined()
  expect(response.body.length).toEqual(1)
})
