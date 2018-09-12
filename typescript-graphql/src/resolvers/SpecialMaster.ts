import { ISpecialMaster } from '../generated/resolvers'
import { Types } from './types'

export interface SpecialMasterRoot {
  id: string
}

export const SpecialMaster: ISpecialMaster.Resolver<Types> = {
  id: root => root.id,
  catBrothers: (root, args, ctx) => ctx.db.master({ id: root.id }).catz(),
}
