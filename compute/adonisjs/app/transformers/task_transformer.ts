import type Task from '#models/task'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class TaskTransformer extends BaseTransformer<Task> {
  toObject() {
    return this.pick(this.resource, ['id', 'title', 'completed', 'createdAt'])
  }
}
