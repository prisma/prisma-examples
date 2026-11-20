import { type ReactNode } from 'react'
import { Head } from '@inertiajs/react'

/**
 * The frame for an app page: sets the document title and renders the page
 * heading, an optional description and optional actions (buttons, links)
 * aligned to the right. Pass `hideTitle` to only set the document title.
 */
export default function Page({
  title,
  hideTitle = false,
  description,
  actions,
  children,
}: {
  title: string
  hideTitle?: boolean
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
}) {
  const hasHeader = !hideTitle || description || actions

  return (
    <div className="page">
      <Head title={title} />
      {hasHeader && (
        <header className="page__header">
          <div>
            {!hideTitle && <h1 className="page__title">{title}</h1>}
            {description && <p className="page__description">{description}</p>}
          </div>
          {actions && <div className="page__actions">{actions}</div>}
        </header>
      )}
      {children}
    </div>
  )
}
