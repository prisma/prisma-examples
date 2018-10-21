import { AuthPayloadResolvers } from '../generated/graphqlgen'

export const AuthPayload: AuthPayloadResolvers.Type = {
  token: parent => parent.token,
  user: parent => parent.user,
}
