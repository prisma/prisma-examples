/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

export type { Route, Path } from './schema.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [[0,"/"]],
    types: placeholder as Registry['home']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [[0,"signup"]],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [[0,"login"]],
    types: placeholder as Registry['session.store']['types'],
  },
  'tasks.index': {
    methods: ["GET","HEAD"],
    pattern: '/tasks',
    tokens: [[0,"tasks"]],
    types: placeholder as Registry['tasks.index']['types'],
  },
  'tasks.store': {
    methods: ["POST"],
    pattern: '/tasks',
    tokens: [[0,"tasks"]],
    types: placeholder as Registry['tasks.store']['types'],
  },
  'tasks.edit': {
    methods: ["GET","HEAD"],
    pattern: '/tasks/:id/edit',
    tokens: [[0,"tasks"],[1,"id"],[0,"edit"]],
    types: placeholder as Registry['tasks.edit']['types'],
  },
  'tasks.update': {
    methods: ["PUT","PATCH"],
    pattern: '/tasks/:id',
    tokens: [[0,"tasks"],[1,"id"]],
    types: placeholder as Registry['tasks.update']['types'],
  },
  'tasks.destroy': {
    methods: ["DELETE"],
    pattern: '/tasks/:id',
    tokens: [[0,"tasks"],[1,"id"]],
    types: placeholder as Registry['tasks.destroy']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [[0,"logout"]],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
