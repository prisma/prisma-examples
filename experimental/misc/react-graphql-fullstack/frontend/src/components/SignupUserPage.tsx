import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import {
  SignupUserMutationVariables,
  SignupUserMutation,
} from '../generated/types'

class SignupUserPage extends Component<RouteComponentProps> {
  state = {
    name: '',
    email: '',
  }

  render() {
    return (
      <Mutation<SignupUserMutation, SignupUserMutationVariables>
        mutation={SIGNUP_USER_MUTATION}
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
                <a
                  className="f6 pointer"
                  onClick={e => {
                    e.preventDefault()
                    this.props.history.goBack()
                  }}
                  href="back"
                >
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

const SIGNUP_USER_MUTATION = gql`
  mutation SignupUser($name: String!, $email: String!) {
    signupUser(data: { name: $name, email: $email, role: AUTHOR }) {
      id
    }
  }
`

export default withRouter(SignupUserPage)
