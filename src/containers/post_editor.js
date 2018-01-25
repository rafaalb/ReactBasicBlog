import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addPost } from './../actions/post_actions';
import { setUsername } from './../actions/user_actions';

const initialState = {
    title: '',
    content: '',
    username: '',
    touched: {
      content: false,
      title: false,
      username: false,
    },
};

class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };
  }
  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  }
  cancelPost = () => {
    this.setState(initialState);
  }

  addPost = () => {
      const { title, content } = this.state;
      const { username } = this.props;
      const date = new Date();
      const id = this.props.posts.length + 1;
      this.props.addPost({
        title,
        content,
        username,
        id,
        comments: [],
        date: date.toLocaleString()
      });
      this.cancelPost();
  }

  isValid() {
    return this.state.title.trim().length > 0 && this.state.content.trim().length > 0;
  }

  render() {
    const { username } = this.props;
    const errors = validate(username, this.state.title, this.state.content);
    const shouldMarkError = (field) => {
       const hasError = errors[field];
       const shouldShow = this.state.touched[field];
       return hasError ? shouldShow : false;
     };
     console.log(this.props);
    return (
      <div id="postEditor">
        <input
            id="username"
            className="form-control margin"
            type="text"
            placeholder="Username"
            value={username}
            onBlur={this.handleBlur('username')}
            onChange={e => this.props.setUsername(e.target.value)}
        />
        {shouldMarkError('username') && <p className="errorForm">Username is required</p>}
        <input
            id="title"
            className={'form-control margin'}
            type="text"
            placeholder="Title"
            value={this.state.title}
            onBlur={this.handleBlur('title')}
            onChange={e => this.setState({ title: e.target.value })}
        />
        {shouldMarkError('title') && <p className="errorForm">Title is required</p>}
        <textarea
            className={'form-control margin'}
            rows="5"
            placeholder="Type something..."
            value={this.state.content}
            onBlur={this.handleBlur('content')}
            onChange={e => this.setState({ content: e.target.value })}
        />
        <div className="postEditorBA">
          <div className="pull-right">
            <button className="btn btn-default" onClick={this.cancelPost}>Cancel</button>
            <button
                className="btn btn-primary"
                disabled={!this.isValid()}
                onClick={this.addPost}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addPost, setUsername }, dispatch);
}

const mapStateToProps = (state) => (state);

function validate(username, title, content) {
  return {
    username: username.length === 0,
    title: title.length === 0,
    content: content.length === 0,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostEditor);
