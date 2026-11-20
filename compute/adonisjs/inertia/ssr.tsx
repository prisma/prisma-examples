import { client } from '~/client'
import ReactDOMServer from 'react-dom/server'
import { TuyauProvider } from '@adonisjs/inertia/react'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { createInertiaApp, type ResolvedComponent } from '@inertiajs/react'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: async (name) => {
      const resolvedPage = await resolvePageComponent(
        `./pages/${name}.tsx`,
        import.meta.glob<{ default: ResolvedComponent }>('./pages/**/*.tsx', { eager: true })
      )
      return resolvedPage.default
    },
    setup: ({ App, props }) => {
      return (
        <TuyauProvider client={client}>
          <App {...props} />
        </TuyauProvider>
      )
    },
  })
}
