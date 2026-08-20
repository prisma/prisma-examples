import { pnContract } from '@prisma/composer-prisma-cloud/prisma-next'

import type { Contract } from './contract.d.js'
import contractJson from './contract.json' with { type: 'json' }

export const databaseContract = pnContract<Contract>(contractJson)
