import { UserSchema } from '#database/schema'
import Task from '#models/task'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  @hasMany(() => Task)
  declare tasks: HasMany<typeof Task>

  get initials() {
    const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
    if (first && last) {
      return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
    }
    return `${first.slice(0, 2)}`.toUpperCase()
  }
}
