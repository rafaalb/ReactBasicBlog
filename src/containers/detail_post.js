import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Link
} from 'react-router-dom';
import {
  setUsername,
  writeComment,
  addComment,
  FlaglikeComment
} from './../actions/user_actions';

class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorFlag: 'black',
      colorLike: 'black',
    };
  }
  componentWillMount() {
    this.props.setUsername('');
  }
  setUsername = (username) => {
    this.props.setUsername(username);
  }

  isValid() {
    const { comment, username } = this.props;
    return comment.length > 0 && username.length > 0;
  }

  writeComment = (comment) => {
    this.props.writeComment(comment);
  }
  flagComment(commentId) {
    const { id } = this.props.match.params;
    this.props.FlaglikeComment({ blogId: Number(id), commentId, flaglike: true });
    this.setState({ colorFlag: 'gray' });
  }
  likeComment(commentId) {
    const { id } = this.props.match.params;
    this.props.FlaglikeComment({ blogId: Number(id), commentId, flaglike: false });
    this.setState({ colorLike: '#c5383899' });
  }

  publishComment() {
    const { comment, username } = this.props;
    const { id } = this.props.match.params;
    this.props.addComment({ comment, username, id: Number(id) });

    this.props.writeComment('');
    this.props.setUsername('');
  }

  listComments(id) {
    const [post] = this.props.posts.filter(e => e.id === id);
      return post.comments.map((comment, index) => (
        (
          <div
              key={index}
              style={{ width: '90%', margin: '0 auto', marginTop: 30, }}
          >
            <div className="media">
              <div className="media-left media-middle">
                  <img className="media-object" style={{ width: 64, height: 64, borderRadius: 32, }} src='https://picsum.photos/200/300?random' alt='' />
              </div>
            <div className="media-body">
              <h4 className="media-heading" style={{ marginTop: 10, }}>{comment.username}</h4>
              <p style={{ marginTop: 10, }}>{comment.comment}</p>
              <button
                  type="button"
                  style={{ marginLeft: 10, }}
                  className="btn btn-default pull-right"
                  aria-label="Left Align"
                  onClick={() => this.flagComment(comment.id)}
              >
                {comment.flags}
                <FontAwesome
                   name='flag'
                   style={{
                     textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                     marginLeft: 5,
                     color: this.state.colorFlag }}
                />
              </button>

              <button
                  type="button"
                  style={{ marginLeft: 10, }}
                  className="btn btn-default pull-right"
                  aria-label="Left Align"
                  onClick={() => this.likeComment(comment.id)}
              >
                {comment.likes}
                <FontAwesome
                   name='heart'
                   style={{
                     textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)',
                     marginLeft: 5,
                     color: this.state.colorLike }}
                />
              </button>

            </div>
            </div>
          </div>
        )
      ));
  }
  render() {
    const { id } = this.props.match.params;
    const [post] = this.props.posts.filter(e => Number(e.id) === Number(id));
    return (
      <div>
        <div id="postDetail">
            <div id="titleBlog">
                <legend className="legend detail">
                  {post.title}
                  <i className="creator"> by {post.username}</i>
                  <i className="creator pull-right timestamp"> {post.date}</i>
                </legend>
            </div>

            <div id="containerContent">
              <p>
                {post.content}
              </p>
              <p style={{ marginTop: 10, }} className="pull-right">
                <Link
                    to={'/new'}
                >
                  See more blogs...
                </Link>
              </p>
            </div>
        </div>
        <div className="response">
            <div className="media" style={{ marginLeft: 15, marginTop: 15, }}>
              <div className="media-left media-middle">
                  <img className="media-object" style={{ width: 46, height: 46, borderRadius: 23, }} src='https://picsum.photos/200/300?random' alt='' />
              </div>
            <div className="media-body">
              <input
                type="text"
                className="media-heading usernameInput"
                name="fname"
                value={this.props.username}
                placeholder="Your username..."
                onChange={(e) => this.setUsername(e.target.value)}
              />
              <p>
                <input
                  type="text"
                  className="media-heading commentInput"
                  name="fname"
                  value={this.props.comment}
                  placeholder="Write a comment..."
                  onChange={(e) => this.writeComment(e.target.value)}
                />
              </p>
            </div>
            </div>
            <button
                type="button"
                className="btn btn-default pull-right "
                aria-label="Left Align"
                style={{ marginTop: 30, }}
                onClick={() => this.isValid() && this.publishComment()}
            >
                Publish
            </button>
        </div>
        <div id="commentSection">
          <legend className="legend detail">
            <FontAwesome
               className='super-crazy-colors'
               name='comments-o'
               style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginRight: 10 }}
            />
            Comments
            <div className="pull-right" style={{ fontSize: 13 }}>
              {post.comments.length}
            <FontAwesome
               className='pull-right'
               name='comment-o'
               style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)', marginRight: 10 }}
            />
            </div>
          </legend>
          {this.listComments(Number(id))}

        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    setUsername,
    writeComment,
    addComment,
    FlaglikeComment
  }, dispatch)
);
export default connect((state) => state, mapDispatchToProps)(DetailPost);
