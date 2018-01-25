import React, { Component } from 'react';
// components
import PostList from './post_list';
import PostEditor from './../../containers/post_editor';

export default class PostApp extends Component {
  render() {
    return (
        <div>
          <div id="postApp">
            <PostEditor />
          </div>
          <PostList />
        </div>
    );
  }
}
