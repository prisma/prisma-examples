import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import { ListChecks, LogOut } from 'lucide-react'
import { Form } from '@adonisjs/inertia/react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'
import NavLink from '~/components/nav_link'

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="header header--bar">
        <div className="header__inner">
          <Logo size={28} />
          <div className="header__right">
            <ThemeToggle />
            <Form route="session.destroy">
              <button type="submit" className="btn btn--secondary btn--sm">
                <LogOut size={15} /> Log out
              </button>
            </Form>
          </div>
        </div>
      </header>

      <nav className="subnav">
        <div className="subnav__inner">
          {/*
            Top-level app navigation. Add a NavLink here for every new area of
            your app. It marks itself active on the current page.
          */}
          <NavLink route="tasks.index" className="subnav__item">
            <ListChecks size={14} />
            Tasks
          </NavLink>
        </div>
      </nav>

      <div className="app-main">{children}</div>
      <FlashToasts />
    </>
  )
}
