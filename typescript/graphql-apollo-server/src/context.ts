import { Photon } from '@generated/photon'

const photon = new Photon()

export interface Context {
  photon: Photon
}

export function createContext(): Context {
  return { photon }
}
