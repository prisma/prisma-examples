import { ICat } from '../generated/resolvers'
import { Types } from './types'
import { CatRoot } from './Cat'

export interface CatRoot {
  id: string
  name: string
  color: string
  favBrother?: CatRoot
}

export const Cat: ICat.Resolver<Types> = {
  id: root => root.id,
  name: root => root.name,
  color: root => root.color,
  favBrother: (root, args, ctx) => ctx.db.cat({ id: root.id }).favBrother(),
}
