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
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(body)
            })
            const data = await res.json()
            console.log(`Created post`, data)
          }}
        >
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
}