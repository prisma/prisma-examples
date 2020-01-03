import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Router from 'next/router'
import { withApollo } from '../apollo/client'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String
    $authorEmail: String!
  ) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`

function Draft(props) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [authorEmail, setAuthorEmail] = useState('')

  const [createDraft, { loading, error, data }] = useMutation(
    CreateDraftMutation,
  )

  return (
    <Layout>
      <div>
        <form
          onSubmit={async e => {
            e.preventDefault()

            await createDraft({
              variables: {
                title,
                content,
                authorEmail,
              },
            })
            Router.push('/')
          }}
        >
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={e => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={e => setAuthorEmail(e.target.value)}
            placeholder="Author (email adress)"
            type="text"
            value={authorEmail}
          />
          <textarea
            cols={50}
            onChange={e => setContent(e.target.value)}
            placeholder="Content"
            rows={8}
            value={content}
          />
          <input
            disabled={!content || !title || !authorEmail}
            type="submit"
            value="Create"
          />
          or
          <button
            onClick={e => {
              Router.back()
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default withApollo(Draft)
