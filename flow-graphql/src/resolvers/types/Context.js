/* @flow */

import type { Prisma } from '../../generated/prisma-client'
export interface Context {
  db: Prisma;
}
