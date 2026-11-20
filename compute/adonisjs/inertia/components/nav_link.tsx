import { urlFor } from '~/client'
import { usePage } from '@inertiajs/react'
import { Link } from '@adonisjs/inertia/react'
import { type ComponentProps, type ReactNode } from 'react'

type LinkRoute = NonNullable<ComponentProps<typeof Link>['route']>

/**
 * The props of a route `Link`, so `routeParams` is checked against the
 * route, plus `exact`.
 */
type NavLinkProps<Route extends LinkRoute> = Extract<
  Parameters<typeof Link<Route>>[0],
  { route: Route }
> & { exact?: boolean; className?: string; children: ReactNode }

/**
 * A link that marks itself with `aria-current="page"` when the current URL
 * matches its route. By default nested URLs count as a match, so a
 * "Settings" link stays active on "/settings/security". Pass `exact` to
 * only match the route itself.
 */
export default function NavLink<Route extends LinkRoute>({
  exact = false,
  ...props
}: NavLinkProps<Route>) {
  const { url } = usePage()

  /**
   * Inside this generic function TypeScript can't tie `routeParams` to
   * `route`, so the two calls below are cast. Each caller's props are
   * still checked against its route.
   */
  const href = (urlFor as (route: string, params?: unknown) => string)(
    props.route,
    props.routeParams
  )
  const path = url.split('?')[0]
  const isActive = exact ? path === href : path === href || path.startsWith(`${href}/`)

  return (
    <Link
      {...(props as ComponentProps<typeof Link>)}
      aria-current={isActive ? 'page' : undefined}
    />
  )
}
