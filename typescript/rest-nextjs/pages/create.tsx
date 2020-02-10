import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Router from 'next/router'

export default class Draft extends React.Component {
  state = {
    title: '',
    content: '',
    authorEmail: '',
  }

  render() {
    return (
      <Layout>
        <div>
          <form
            onSubmit={async e => {
              e.preventDefault()
              const body = this.state
              const res = await fetch(`http://localhost:3000/api/post`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              })
              const data = await res.json()
              Router.push('/drafts')
            }}>
            <h1>Create Draft</h1>
            <input
              autoFocus
              onChange={e => this.setState({ title: e.target.value })}
              placeholder="Title"
              type="text"
              value={this.state.title}
            />
            <input
              onChange={e => this.setState({ authorEmail: e.target.value })}
              placeholder="Author (email adress)"
              type="text"
              value={this.state.authorEmail}
            />
            <textarea
              cols={50}
              onChange={e => this.setState({ content: e.target.value })}
              placeholder="Content"
              rows={8}
              value={this.state.content}
            />
            <input
              disabled={
                !this.state.content ||
                !this.state.title ||
                !this.state.authorEmail
              }
              type="submit"
              value="Create"
            />
            <a className="back" href="#" onClick={() => Router.push('/')}>
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

          input[type='text'],
          textarea {
            width: 100%;
            padding: 0.5rem;
            margin: 0.5rem 0;
            border-radius: 0.25rem;
            border: 0.125rem solid rgba(0, 0, 0, 0.2);
          }

          input[type='submit'] {
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
}
