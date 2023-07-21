import React from 'react'
import { GetServerSideProps } from 'next'
import ReactMarkdown from 'react-markdown'
import Router from 'next/router'
import { PostProps } from '@/components/Post'
import prisma from '@/lib/prisma'
import styles from '@/styles/Post.module.css'

async function publish(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: 'PUT',
  })
  await Router.push('/')
}

async function destroy(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE',
  })
  await Router.push('/')
}

export default function Post(props: PostProps) {
  let title = props.title
  if (!props.published) {
    title = `${title} (Draft)`
  }

  return (
    <div>
      <h2>{title}</h2>
      <p>By {props?.author?.name || 'Unknown author'}</p>
      <ReactMarkdown>{props.content}</ReactMarkdown>
      {!props.published && (
        <button className={styles.button} onClick={() => publish(props.id)}>
          Publish
        </button>
      )}
      <button className={styles.button} onClick={() => destroy(props.id)}>
        Delete
      </button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(
    Array.isArray(context.params?.id)
      ? context.params?.id[0]
      : context.params?.id,
  )
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true },
  })
  return { props: { ...post } }
}
