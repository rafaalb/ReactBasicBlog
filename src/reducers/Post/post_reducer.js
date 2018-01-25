import { ADD_POST, ADD_COMMENT, FLAG_LIKE_COMMENT } from '../../actions/action_types';

export const posts = (state = [], action) => {
  switch (action.type) {
    case ADD_POST:
      return [
        ...state,
        action.post,
      ];

    case ADD_COMMENT:
      return state.map((blog) => {
        if (blog.id === action.id) {
          return {
            ...blog,
            comments: blog.comments.concat({
              username: action.username,
              comment: action.comment,
              likes: 0,
              flags: 0,
              id: blog.comments.length + 1,
            })
          };
        }
        return blog;
      });

    case FLAG_LIKE_COMMENT:
      return state.map((blog) => {
        if (blog.id === action.blogId) {
          return {
            ...blog,
            comments: blog.comments.map((comment) => {
              if (comment.id === action.commentId) {
                return {
                  ...comment,
                  likes: !action.flaglike ? comment.likes + 1 : comment.likes,
                  flags: action.flaglike ? comment.flags + 1 : comment.flags,
                };
              }
              return comment;
            })
          };
        }
        return blog;
      });
    default:
      return state;
  }
};
