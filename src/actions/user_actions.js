import {
  SET_USERNAME,
  WRITE_COMMENT,
  ADD_COMMENT,
  FLAG_LIKE_COMMENT
} from './action_types';

export const setUsername = (username) => ({
    type: SET_USERNAME,
    username
});

export const writeComment = (comment) => ({
  type: WRITE_COMMENT,
  comment
});

export const addComment = ({ username, comment, id }) => ({
  type: ADD_COMMENT,
  username,
  comment,
  id
});

export const FlaglikeComment = ({ blogId, commentId, flaglike }) => ({
  type: FLAG_LIKE_COMMENT,
  blogId,
  commentId,
  flaglike
});
