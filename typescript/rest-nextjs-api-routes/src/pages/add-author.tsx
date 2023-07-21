import React, { useState } from 'react'
import Router from 'next/router'
import styles from '@/styles/AddAuthor.module.css'

export default function AddAuthor() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { name, email }
      await fetch(`/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={submitData}>
        <h1>Add Author</h1>
        <input
          autoFocus
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          type="text"
          value={name}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          type="text"
          value={email}
        />
        <input disabled={!name || !email} type="submit" value="Add Author" />
        <a className={styles.black} href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}
