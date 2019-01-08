import { updateObject } from '../../utils/updateObject';
import {
    GET_FORUM_SUCCESSFUL, GET_FORUM_UNSUCCESSFUL,
    UPDATE_FORUM_SUCCESSFUL, UPDATE_FORUM_UNSUCCESSFUL, RESET_UPDATE_FORUM_STATUS
} from './index';


const getForumWasSuccessful = (state, action) => {
    return updateObject(state, {
        forums: action.payload.data,
        get_forum_status: action.payload.status,
        get_forum_message: action.payload.message
    });
}
const getForumWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_forum_status: action.payload.status,
        get_forum_message: action.payload.message
    });
}
const updateForumWasSuccessful = (state, action) => {
    const newforumArray = [...state.forums].filter(forum => {
        return forum.id !== action.payload.data.id
    });

    return {
        ...state,
        update_forum_status: action.payload.status,
        forums: newforumArray
    }
}
const updateForumWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_forum_status: action.payload.status,
        update_forum_message: action.payload.message
    }
}
const resetUpdateForumStatus = (state, action) => {
    return {
        ...state,
        update_forum_status: null,
        update_forum_message: null
    }
}



const initialState = {
    forums: [],

    get_forum_status: null,
    get_forum_message: null,

    update_forum_status: null,
    update_forum_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_FORUM_SUCCESSFUL: getForumWasSuccessful,
        GET_FORUM_WAS_UNSUCCESSFUL: getForumWasUnsuccessful,

        UPDATE_FORUM_SUCCESSFUL: updateForumWasSuccessful,
        UPDATE_FORUM_UNSUCCESSFUL: updateForumWasUnsuccessful,

        RESET_UPDATE_FORUM_STATUS: resetUpdateForumStatus,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;