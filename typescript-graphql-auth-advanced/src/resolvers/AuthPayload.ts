import { AuthPayloadResolvers } from '../generated/graphqlgen'

export const AuthPayload: AuthPayloadResolvers.Type = {
  ...AuthPayloadResolvers.defaultResolvers,
}
