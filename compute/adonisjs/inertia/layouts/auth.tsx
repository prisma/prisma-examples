import Logo from '~/components/logo'
import { type ReactNode } from 'react'
import FlashToasts from '~/components/flash_toasts'
import ThemeToggle from '~/components/theme_toggle'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="auth">
        <div className="auth__form-col">
          <Logo size={28} />
          <div className="auth__form-wrap">{children}</div>
          <div style={{ height: 20 }} />
        </div>

        <aside className="auth__aside">
          <div className="auth__aside-top">
            <ThemeToggle />
          </div>

          <p className="auth__quote">
            Auth, kept intentionally minimal so you can build it your way.
          </p>

          <div>
            <div className="pitch__t">Looking for production-ready auth?</div>
            <p className="pitch__p">
              Check out Feature packs, production-ready full-stack components from the creator of
              AdonisJS.
            </p>
            <a
              className="il pitch__a"
              href="https://plus.adonisjs.com/feature-packs"
              target="_blank"
              rel="noreferrer"
            >
              Explore Feature packs →
            </a>
          </div>
        </aside>
      </div>
      <FlashToasts />
    </>
  )
}
