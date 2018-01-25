import { ADD_POST } from './action_types';
// action creator
export const addPost = (post) => ({
    type: ADD_POST,
    post
});
