import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/components/Header.module.css'

const Header: React.FC = () => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname

  return (
    <nav>
      <div className={styles.left}>
        <Link href="/" legacyBehavior>
          <a className={styles.bold} data-active={isActive('/')}>
            Blog
          </a>
        </Link>
        <Link href="/drafts" legacyBehavior>
          <a data-active={isActive('/drafts')}>Drafts</a>
        </Link>
      </div>
      <div className={styles.right}>
        <Link href="/signup" legacyBehavior>
          <a data-active={isActive('/signup')}>Signup</a>
        </Link>
        <Link href="/create" legacyBehavior>
          <a data-active={isActive('/create')}>+ Create draft</a>
        </Link>
      </div>
    </nav>
  )
}

export default Header
