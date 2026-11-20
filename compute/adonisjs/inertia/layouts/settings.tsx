import Page from '~/components/page'
import { type ReactNode } from 'react'
import NavLink, { type NavItem } from '~/components/nav_link'

/**
 * The pages of the settings area, listed in the sidebar. Register a route
 * for each page and add it here, for example:
 *
 * `{ label: 'Profile', route: 'settings.profile', icon: User }`
 */
const items: NavItem[] = []

/**
 * Renders the settings heading, a sidebar of links and a card holding the
 * current page. Nest it under the app layout from each settings page:
 *
 * `Profile.layout = [AppLayout, SettingsLayout]`
 */
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <Page title="Settings" description="Manage your account settings and preferences.">
      <div className="sidebar-layout">
        <nav className="sidebar-layout__nav" aria-label="Settings">
          {items.map(({ label, route, icon: Icon }) => (
            <NavLink key={label} route={route} exact className="sidebar-layout__item">
              {Icon && <Icon size={16} />}
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-layout__content panel">{children}</div>
      </div>
    </Page>
  )
}
