import { objectType } from 'nexus'

export const AuthPayload = objectType('AuthPayload', t => {
  t.string('token')
  t.field('user', 'User')
})
