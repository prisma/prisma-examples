import Page from '~/components/page'
import { type ReactNode } from 'react'

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
          {/*
            The pages of the settings area. Register a route for each page and
            add a NavLink for it here, for example:

            <NavLink route="settings.profile" exact className="sidebar-layout__item">
              <User size={16} />
              Profile
            </NavLink>
          */}
        </nav>
        <div className="sidebar-layout__content panel">{children}</div>
      </div>
    </Page>
  )
}
