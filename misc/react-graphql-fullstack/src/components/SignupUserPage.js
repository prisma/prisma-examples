import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import { DRAFTS_QUERY } from './DraftsPage'

class SignupUserPage extends Component {
  state = {
    name: '',
    email: '',
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_DRAFT_MUTATION}
        update={(cache, { data }) => {
          const { drafts } = cache.readQuery({ query: DRAFTS_QUERY })
          cache.writeQuery({
            query: DRAFTS_QUERY,
            data: { drafts: drafts.concat([data.createDraft]) },
          })
        }}
      >
        {(createDraft, { data, loading, error }) => {
          return (
            <div className="pa4 flex justify-center bg-white">
              <form
                onSubmit={async e => {
                  e.preventDefault()
                  const { name, email } = this.state
                  await createDraft({
                    variables: { name, email },
                  })
                  this.props.history.replace('/')
                }}
              >
                <h1>Create User</h1>
                <input
                  autoFocus
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ name: e.target.value })}
                  placeholder="Name"
                  type="text"
                  value={this.state.name}
                />
                <input
                  className="w-100 pa2 mv2 br2 b--black-20 bw1"
                  onChange={e => this.setState({ email: e.target.value })}
                  placeholder="Email adress"
                  type="text"
                  value={this.state.email}
                />
                <input
                  className={`pa3 bg-black-10 bn ${this.state.name &&
                    this.state.email &&
                    'dim pointer'}`}
                  disabled={!this.state.name || !this.state.email}
                  type="submit"
                  value="Create"
                />
                <a className="f6 pointer" onClick={this.props.history.goBack}>
                  or cancel
                </a>
              </form>
            </div>
          )
        }}
      </Mutation>
    )
  }

}

const CREATE_DRAFT_MUTATION = gql`
  mutation SignupUserMutation($name: String!, $email: String!) {
    signupUser(data: {
      name: $name,
      email: $email
    }) {
      id
    }
  }
`

export default withRouter(SignupUserPage)
