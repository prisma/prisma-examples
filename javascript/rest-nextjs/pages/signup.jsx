import React from 'react'
import fetch from 'isomorphic-unfetch'
import Layout from '../components/Layout'
import Router from 'next/router'

export default class Signup extends React.Component {
  state = {
    name: '',
    email: '',
  }

  render() {
    return (
      <Layout>
        <div className="page">
          <form
            onSubmit={async e => {
              e.preventDefault()
              const body = this.state
              const res = await fetch(`http://localhost:3000/api/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
              })
              const data = await res.json()
              Router.push('/')
            }}>
            <h1>Signup user</h1>
            <input
              autoFocus
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Name"
              type="text"
              value={this.state.name}
            />
            <input
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="Email address)"
              type="text"
              value={this.state.email}
            />
            <input
              disabled={!this.state.name || !this.state.email}
              type="submit"
              value="Signup"
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
          }

          input[type='text'] {
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
