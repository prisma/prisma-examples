import vine from '@vinejs/vine'

/**
 * Shared rule for the task title.
 */
const title = () => vine.string().trim().minLength(1).maxLength(255)

/**
 * Validator to use when creating a task
 */
export const createTaskValidator = vine.create({
  title: title(),
})

/**
 * Validator to use when renaming a task or marking it as done.
 * Both fields are optional, so one form can change either.
 */
export const updateTaskValidator = vine.create({
  title: title().optional(),
  completed: vine.boolean().optional(),
})
