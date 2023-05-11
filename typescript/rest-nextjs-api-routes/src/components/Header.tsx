'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from '@/components/Header.module.css'

export default function Header() {
  const currentPathname = usePathname()
  const isActive: (pathname: string) => boolean = (pathname) =>
    currentPathname === pathname

  return (
    <nav>
      <div className={styles.left}>
        <Link className={styles.bold} href="/" data-active={isActive('/')}>
          Blog
        </Link>
        <Link href="/drafts" data-active={isActive('/drafts')}>
          Drafts
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/signup" data-active={isActive('/signup')}>
          Signup
        </Link>
        <Link href="/create" data-active={isActive('/create')}>
          + Create draft
        </Link>
      </div>
    </nav>
  )
}
