import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export interface PostProps {
  post: Post
  isDraft: boolean
}

export interface Post {
  id: string
  title: string
  author: Author
  content: string
}

export interface Author {
  name: string
}

export default class PostComponent extends Component<PostProps> {
  render() {
    let title = this.props.post.title
    if (this.props.isDraft) {
      title = `${title} (Draft)`
    }

    return (
      <Link className="no-underline ma1" to={`/post/${this.props.post.id}`}>
        <h2 className="f3 black-80 fw4 lh-solid">{title}</h2>
        <p className="black-80 f5">
          By {this.props.post.author.name || 'Unknown author'}
        </p>
        <p className="black-80 fw3">{this.props.post.content}</p>
      </Link>
    )
  }
}
