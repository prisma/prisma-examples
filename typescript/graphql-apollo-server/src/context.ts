import { Photon } from "@generated/photon"

const photon = new Photon()

export type Context = {
  photon: Photon
}

export function createContext(): Context {
  return { photon }
}
