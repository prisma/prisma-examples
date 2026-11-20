import { useRef } from 'react'
import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'
import { Circle, CircleCheckBig, Pencil, Trash2 } from 'lucide-react'

/**
 * A task that is shown before the server saves it has a negative id.
 * Its actions stay disabled until the server sends the saved task.
 */
const isPending = (task: Data.Task) => task.id < 0

export default function TasksIndex({ tasks }: InertiaProps<{ tasks: Data.Task[] }>) {
  const titleInput = useRef<HTMLInputElement>(null)
  const submittedTitle = useRef('')

  /**
   * Put the title back when the request fails, unless the user has
   * already typed another one.
   */
  const restoreTitle = () => {
    if (titleInput.current && titleInput.current.value === '') {
      titleInput.current.value = submittedTitle.current
    }
  }

  return (
    <Page
      title="Tasks"
      description="Every task is a row in your Prisma Postgres database, served by AdonisJS and React."
    >
      <div className="panel">
        <Form
          route="tasks.store"
          className="task-form"
          options={{ preserveScroll: true }}
          optimistic={(props, data) => ({
            tasks: [
              {
                id: -Date.now(),
                title: String(data.title).trim(),
                completed: false,
                createdAt: new Date().toISOString(),
              },
              ...(props.tasks as Data.Task[]),
            ],
          })}
          onStart={() => {
            submittedTitle.current = titleInput.current?.value ?? ''
            if (titleInput.current) titleInput.current.value = ''
          }}
          onError={restoreTitle}
          onHttpException={restoreTitle}
          onNetworkError={restoreTitle}
        >
          {({ errors }) => (
            <>
              <div className="field">
                <label className="field__label sr-only" htmlFor="title">
                  New task
                </label>
                <input
                  ref={titleInput}
                  id="title"
                  name="title"
                  className="field__input"
                  placeholder="What needs doing?"
                  autoComplete="off"
                  maxLength={255}
                  required
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title && <span className="field__error">{errors.title}</span>}
              </div>
              <button type="submit" className="btn btn--primary">
                Add task
              </button>
            </>
          )}
        </Form>

        {tasks.length ? (
          <ul className="tasks">
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`task ${task.completed ? 'task--done' : ''} ${isPending(task) ? 'task--pending' : ''}`}
              >
                <Form
                  route="tasks.update"
                  routeParams={{ id: task.id }}
                  options={{ preserveScroll: true }}
                >
                  <input type="hidden" name="completed" value={task.completed ? 'false' : 'true'} />
                  <button
                    type="submit"
                    className="iconbtn"
                    disabled={isPending(task)}
                    aria-label={task.completed ? 'Mark as open' : 'Mark as done'}
                  >
                    {task.completed ? <CircleCheckBig size={18} /> : <Circle size={18} />}
                  </button>
                </Form>

                <span className="task__title">{task.title}</span>

                {isPending(task) ? (
                  <span className="iconbtn" aria-hidden="true">
                    <Pencil size={16} />
                  </span>
                ) : (
                  <Link
                    route="tasks.edit"
                    routeParams={{ id: task.id }}
                    className="iconbtn"
                    aria-label="Rename task"
                  >
                    <Pencil size={16} />
                  </Link>
                )}

                <Form
                  route="tasks.destroy"
                  routeParams={{ id: task.id }}
                  options={{ preserveScroll: true }}
                  optimistic={(props) => ({
                    tasks: (props.tasks as Data.Task[]).filter(({ id }) => id !== task.id),
                  })}
                >
                  <button
                    type="submit"
                    className="iconbtn"
                    disabled={isPending(task)}
                    aria-label="Delete task"
                  >
                    <Trash2 size={16} />
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        ) : (
          <p className="tasks__empty">No tasks yet. Add your first one above.</p>
        )}
      </div>
    </Page>
  )
}

TasksIndex.layout = [AppLayout]
