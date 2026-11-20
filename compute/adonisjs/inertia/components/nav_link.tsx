import { urlFor } from '~/client'
import { usePage } from '@inertiajs/react'
import { type LucideIcon } from 'lucide-react'
import { type ReactNode } from 'react'
import { Link } from '@adonisjs/inertia/react'

export type NavRoute = Parameters<typeof urlFor>[0]

export type NavItem = {
  label: string
  route: NavRoute
  icon?: LucideIcon
}

/**
 * A link that marks itself with `aria-current="page"` when the current URL
 * matches its route. By default nested URLs count as a match, so a
 * "Settings" link stays active on "/settings/security". Pass `exact` to
 * only match the route itself.
 */
export default function NavLink({
  route,
  exact = false,
  className,
  children,
}: {
  route: NavRoute
  exact?: boolean
  className?: string
  children: ReactNode
}) {
  const { url } = usePage()
  const href = urlFor(route)
  const path = url.split('?')[0]
  const isActive = exact ? path === href : path === href || path.startsWith(`${href}/`)

  return (
    <Link href={href} className={className} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  )
}
