import { updateObject } from '../../utils/updateObject';
import {
    GET_FORUM_COMMENT_SUCCESSFUL, GET_FORUM_COMMENT_UNSUCCESSFUL,
    UPDATE_FORUM_COMMENT_SUCCESSFUL, UPDATE_FORUM_COMMENT_UNSUCCESSFUL, RESET_UPDATE_FORUM_COMMENT_STATUS
} from './index';


const getForumCommentWasSuccessful = (state, action) => {
    return updateObject(state, {
        forumComments: action.payload.data,
        get_forum_comment_status: action.payload.status,
        get_forum_comment_message: action.payload.message
    });
}
const getForumCommentWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_forum_comment_status: action.payload.status,
        get_forum_comment_message: action.payload.message
    });
}
const updateForumCommentWasSuccessful = (state, action) => {
    const newForumCommentArray = [...state.forumComments].filter(forumComment => {
        return forumComment.id !== action.payload.data.id
    });

    return {
        ...state,
        update_forum_comment_status: action.payload.status,
        forumComments: newForumCommentArray
    }
}
const updateForumCommentWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_forum_comment_status: action.payload.status,
        update_forum_comment_message: action.payload.message
    }
}
const resetUpdateForumCommentStatus = (state, action) => {
    return {
        ...state,
        update_forum_comment_status: null,
        update_forum_comment_message: null
    }
}



const initialState = {
    forumComments: [],

    get_forum_comment_status: null,
    get_forum_comment_message: null,

    update_forum_comment_status: null,
    update_forum_comment_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_FORUM_COMMENT_SUCCESSFUL: getForumCommentWasSuccessful,
        GET_FORUM_COMMENT_UNSUCCESSFUL: getForumCommentWasUnsuccessful,

        UPDATE_FORUM_COMMENT_SUCCESSFUL: updateForumCommentWasSuccessful,
        UPDATE_FORUM_COMMENT_UNSUCCESSFUL: updateForumCommentWasUnsuccessful,

        RESET_UPDATE_FORUM_COMMENT_STATUS: resetUpdateForumCommentStatus,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;