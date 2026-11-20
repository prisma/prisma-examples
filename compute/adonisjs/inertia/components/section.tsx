import { type ReactNode } from 'react'

/**
 * A group of content within a page, such as a group of form fields, with
 * an optional title and description. Stack several sections and they are
 * separated by a divider.
 */
export default function Section({
  title,
  description,
  children,
}: {
  title?: string
  description?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="section">
      {(title || description) && (
        <header className="section__header">
          {title && <h2 className="section__title">{title}</h2>}
          {description && <p className="section__description">{description}</p>}
        </header>
      )}
      <div className="section__body">{children}</div>
    </section>
  )
}
