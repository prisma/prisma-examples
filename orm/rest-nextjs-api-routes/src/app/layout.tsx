import Header from '../components/Header'
import '../styles/global.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ padding: "0 2rem" }}>{children}</div>
      </body>
    </html>
  )
}
