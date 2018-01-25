import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';


export default class PostItem extends Component {
  render() {
    return (
      <li className="list-group-item justify-content-between noBlue">
        <Link
            to={`/post/${this.props.id}`}
        >
          { this.props.title }
          <i className="creator"> by {this.props.username}</i>
          <span className="badge badge-default badge-pill pull-right">
            {this.props.comments.length}
          </span>
        </Link>
      </li>
    );
  }
}
