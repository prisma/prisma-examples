import TaskTransformer from '#transformers/task_transformer'
import { createTaskValidator, updateTaskValidator } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * TasksController handles the signed-in user's task list. Every query
 * goes through the user's "tasks" relationship, so a user can only read
 * and change their own tasks.
 */
export default class TasksController {
  /**
   * Display the user's tasks, open ones first
   */
  async index({ auth, inertia }: HttpContext) {
    const tasks = await auth
      .getUserOrFail()
      .related('tasks')
      .query()
      .orderBy('completed', 'asc')
      .orderBy('createdAt', 'desc')

    return inertia.render('tasks/index', { tasks: TaskTransformer.transform(tasks) })
  }

  /**
   * Create a task
   */
  async store({ auth, request, response }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)
    await auth.getUserOrFail().related('tasks').create(payload)

    response.redirect().toRoute('tasks.index')
  }

  /**
   * Display the form to rename a task
   */
  async edit({ auth, params, inertia }: HttpContext) {
    const task = await auth
      .getUserOrFail()
      .related('tasks')
      .query()
      .where('id', params.id)
      .firstOrFail()

    return inertia.render('tasks/edit', { task: TaskTransformer.transform(task) })
  }

  /**
   * Rename a task or mark it as done
   */
  async update({ auth, params, request, response }: HttpContext) {
    const task = await auth
      .getUserOrFail()
      .related('tasks')
      .query()
      .where('id', params.id)
      .firstOrFail()

    const payload = await request.validateUsing(updateTaskValidator)
    await task.merge(payload).save()

    response.redirect().toRoute('tasks.index')
  }

  /**
   * Delete a task
   */
  async destroy({ auth, params, response }: HttpContext) {
    const task = await auth
      .getUserOrFail()
      .related('tasks')
      .query()
      .where('id', params.id)
      .firstOrFail()

    await task.delete()

    response.redirect().toRoute('tasks.index')
  }
}
