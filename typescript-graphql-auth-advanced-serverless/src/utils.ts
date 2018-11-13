import { verify } from 'jsonwebtoken'
import { Context } from './types'

export const APP_SECRET = process.env.APP_SECRET || 'appsecret321'

interface Token {
  userId: string
}

export function getUserId(context: Context) {
  // serverless passes headers through context through the event param via lambda-proxy
  // checking both in-case not using serverless
  const Authorization = context.event.headers.Authorization || context.request.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')
    const verifiedToken = verify(token, APP_SECRET) as Token
    return verifiedToken && verifiedToken.userId
  }
}
