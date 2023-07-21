import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'

export default function Header() {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className={styles.left}>
        <Link href="/" className={styles.bold} data-active={isActive('/')}>
          Blog
        </Link>
        <Link href="/drafts" data-active={isActive('/drafts')}>
          Drafts
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/add-author" data-active={isActive('/add-author')}>
          Add Author
        </Link>
        <Link href="/create" data-active={isActive('/create')}>
          + Create draft
        </Link>
      </div>
    </nav>
  )
}
