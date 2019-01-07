import { updateObject } from '../../utils/updateObject';
import { GET_ACTIVE_FORUM_COMMENT_WAS_SUCCESSFUL, GET_ACTIVE_FORUM_COMMENT_WAS_UNSUCCESSFUL, LIKE_COMMENT_WAS_SUCCESSFUL, LIKE_COMMENT_WAS_UNSUCCESSFUL } from './index';

const getActiveForumCommentsWasSuccessful = (state, action) => {
    return updateObject(state, {
        comments: action.payload.data.comments,
        forum: action.payload.data.forum,
        status: action.payload.status,
    });
}
const getActiveForumCommentsWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const likeCommentWasSuccessful = (state, action) => {
    const newComments = [...state.comments].filter(comment => {
        return comment.id !== action.payload.data.id
    });

    return {
        ...state,
        like_comment_status: action.payload.status,
        comments: [...newComments, action.payload.data]
    }
}
const likeCommentWasUnsuccessful = (state, action) => {
    return {
        ...state,
        like_comment_status: action.payload.status,
    }
}


const initialState = {
    forum: null,
    comments: [],
    status: null,
    message: null,

    like_comment_status: null
};
const reducer = (state = initialState, action) => {
    const lookup = {
        GET_ACTIVE_FORUM_COMMENT_WAS_SUCCESSFUL: getActiveForumCommentsWasSuccessful,
        GET_ACTIVE_FORUM_COMMENT_WAS_UNSUCCESSFUL: getActiveForumCommentsWasUnsuccessful,

        LIKE_COMMENT_WAS_SUCCESSFUL: likeCommentWasSuccessful,
        LIKE_COMMENT_WAS_UNSUCCESSFUL: likeCommentWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;