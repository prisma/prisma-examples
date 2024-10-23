import React, { useState } from "react"
import Router from "next/router"
import { api } from "../utils/api"
import Layout from "../components/Layout"


function Draft() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [authorEmail, setAuthorEmail] = useState("")

  const createDraftMutation = api.post.createDraft.useMutation()

  return (
    <Layout>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault()
            await createDraftMutation.mutateAsync({
              title,
              content,
              authorEmail,
            })
            Router.push("/drafts")
          }}
        >
          <h1>Create Draft</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <input
            onChange={(e) => setAuthorEmail(e.target.value)}
            placeholder="Author (email adress)"
            type="text"
            value={authorEmail}
          />
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
          <a className="back" href="#" onClick={() => Router.push("/")}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="text"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Draft
