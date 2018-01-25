import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import PostApp from './components/Post/post_app';
import DetailPost from './containers/detail_post';


class Routes extends Component {
  render() {
    return (
      <Router>
          <div className="mainBlog">
            <p className="mainText">
              Blog React
            </p>
            <Route path="/" />
            <Route path="/new" component={PostApp} />
            <Route path="/post/:id" component={DetailPost} />
          </div>
      </Router>
    );
  }
}

export default Routes;
