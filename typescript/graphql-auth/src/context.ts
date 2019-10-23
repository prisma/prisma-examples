import { Photon } from '@generated/photon'
import { ContextParameters } from 'graphql-yoga/dist/types'
const photon = new Photon()

export interface Context {
  photon: Photon
  request: any
}

export function createContext(request: ContextParameters) {
  return {
    ...request,
    photon,
  }
}
