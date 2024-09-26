import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Accelerate Hacker News Clone',
  description: 'A minimal hackernews clone using Prisma Accelerate',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="pl-8 pr-8 md:pl-12 md:pr-12 bg-slate-100 h-screen overflow-scroll">
          <div className="h-full flex flex-col">{children}</div>
        </div>
      </body>
    </html>
  )
}
