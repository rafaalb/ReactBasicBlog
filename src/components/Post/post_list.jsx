import React, { Component } from 'react';
import { connect } from 'react-redux';

// components
import PostItem from './post_item';

class PostList extends Component {
  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts.length > 0 &&
          <div className="postList">
          <legend className="legend">Blogs List</legend>
          <ul className="list-group">
            {posts.map((post, index) =>
              <PostItem
                {...post}
                key={index}
              />
            )}
          </ul>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({ posts });

export default connect(mapStateToProps)(PostList);
