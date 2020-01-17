import { Photon } from '@prisma/photon'

const photon = new Photon()

export interface Context {
  photon: Photon
}

export function createContext(): Context {
  return { photon }
}
