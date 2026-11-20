import Page from '~/components/page'
import AppLayout from '~/layouts/app'
import { type Data } from '@generated/data'
import { type InertiaProps } from '~/types'
import { Form, Link } from '@adonisjs/inertia/react'

export default function TasksEdit({ task }: InertiaProps<{ task: Data.Task }>) {
  return (
    <Page title="Rename task">
      <div className="panel">
        <Form route="tasks.update" routeParams={{ id: task.id }} className="task-form">
          {({ errors, processing }) => (
            <>
              <div className="field">
                <label className="field__label sr-only" htmlFor="title">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  className="field__input"
                  defaultValue={task.title}
                  autoComplete="off"
                  maxLength={255}
                  required
                  aria-invalid={errors.title ? 'true' : 'false'}
                />
                {errors.title && <span className="field__error">{errors.title}</span>}
              </div>
              <button type="submit" className="btn btn--primary" disabled={processing}>
                Save
              </button>
              <Link route="tasks.index" className="btn btn--ghost">
                Cancel
              </Link>
            </>
          )}
        </Form>
      </div>
    </Page>
  )
}

TasksEdit.layout = [AppLayout]
