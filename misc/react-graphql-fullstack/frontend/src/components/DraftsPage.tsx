import React, { Component, Fragment } from 'react'
import PostComponent, { Post } from './Post'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { DraftsQuery } from '../generated/types'

export default class DraftsPage extends Component {
  render() {
    return (
      <Query<DraftsQuery> query={DRAFTS_QUERY}>
        {({ data, loading, error, refetch }) => {
          if (loading) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>Loading ...</div>
              </div>
            )
          }

          if (error) {
            return (
              <div className="flex w-100 h-100 items-center justify-center pt7">
                <div>An unexpected error occured.</div>
              </div>
            )
          }
          return (
            <Fragment>
              <div className="flex justify-between items-center">
                <h1>Drafts</h1>
              </div>
              {data.filterPosts &&
                data.filterPosts.map(draft => (
                  <PostComponent
                    key={draft.id}
                    post={draft as Post}
                    isDraft={!draft.published}
                  />
                ))}
              {this.props.children}
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export const DRAFTS_QUERY = gql`
  query Drafts {
    filterPosts(where: { published: { equals: false } }) {
      id
      content
      title
      published
      author {
        id
        name
      }
    }
  }
`
