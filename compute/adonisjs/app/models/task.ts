import { TaskSchema } from '#database/schema'
import User from '#models/user'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * A task on a user's list. The columns come from TaskSchema, which
 * AdonisJS generates from the migrations.
 */
export default class Task extends TaskSchema {
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
