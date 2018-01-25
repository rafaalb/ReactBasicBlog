import { SET_USERNAME, WRITE_COMMENT } from './../../actions/action_types';

export const username = (state = '', action) => {
  switch (action.type) {
    case SET_USERNAME:
      return action.username;
    default:
      return state;
  }
};

export const comment = (state = '', action) => {
  switch (action.type) {
    case WRITE_COMMENT:
      return action.comment;
    default:
      return state;
  }
};
