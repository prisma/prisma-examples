import React from 'react'
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import Router from 'next/router'

export default class Signup extends React.Component {

  state = {
    name: '',
    email: '',
  }

  render() {
    return (
     <Layout>
        <div>
        <form
          onSubmit={async e => {
            e.preventDefault()
            const body = this.state
            const res = await fetch(`http://localhost:3000/api/user`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(body)
            });
            const data = await res.json();
            console.log(`Created user: `, data)
            Router.push('/')
          }}
        >
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
            disabled={
              !this.state.name ||
              !this.state.email
            }
            type="submit"
            value="Signup"
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