import { combineReducers } from 'redux';
import { username, comment } from './User/user_reducer';
import { posts } from './Post/post_reducer';

const rootReducer = combineReducers({
  posts,
  comment,
  username
});

export default rootReducer;
