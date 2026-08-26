import { dataContract } from '@prisma/composer-prisma-cloud/orm'

import type { Contract } from './contract.d.js'
import contractJson from './contract.json' with { type: 'json' }

export const databaseContract = dataContract<Contract>(contractJson)
