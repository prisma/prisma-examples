import React, { useState } from 'react'
import Router from 'next/router'
import styles from '@/styles/Draft.module.css'
import { GetServerSideProps } from 'next'
import prisma from '@/lib/prisma'

type Props = {
  users: { email: string }[]
}

export default function CreateDraft(props: Props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, content, authorEmail }
      await fetch(`/api/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/drafts')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={submitData}>
        <h1>Create Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
        />
        <label>
          Author Email:{' '}
          <select
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          >
            {props.users.map(({ email }, i) => (
              <option value={email} key={email + i}>
                {email}
              </option>
            ))}
          </select>
        </label>
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
        />
        <input
          disabled={!content || !title || !authorEmail}
          type="submit"
          value="Create"
        />
        <a className={styles.black} href="#" onClick={() => Router.push('/')}>
          or Cancel
        </a>
      </form>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany()
  return {
    props: { users },
  }
}
