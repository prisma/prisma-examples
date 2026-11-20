/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
  tasks: {
    index: typeof routes['tasks.index']
    store: typeof routes['tasks.store']
    edit: typeof routes['tasks.edit']
    update: typeof routes['tasks.update']
    destroy: typeof routes['tasks.destroy']
  }
}
