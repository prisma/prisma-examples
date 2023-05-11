import Header from '@/components/Header'
import './globals.css'
import styles from './layout.module.css'

export const metadata = {
  title: 'rest-nextjs-api-routes',
  description: 'Prisma + Next.js + API Routes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className={styles.layout}>{children}</div>
      </body>
    </html>
  )
}
