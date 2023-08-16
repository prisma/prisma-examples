import React, { ReactNode } from 'react'
import Header from './Header'
import styles from '@/components/Layout.module.css'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <div className={styles.layout}>{children}</div>
    </div>
  )
}
