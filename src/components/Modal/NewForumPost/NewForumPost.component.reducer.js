import { updateObject } from '../../../utils/updateObject.js';
import { NEW_FORUM_POST_WAS_SUCCESSFUL, NEW_FORUM_POST_WAS_UNSUCCESSFUL, RESET_NEW_FORUM_POST_STATUS } from './index';



const newForumPostWasSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        // forum: action.payload.data
    });
}


const newForumPostWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const resetNewForumPostStatus = (state, action) => {
    return updateObject(state, {
        status: null,
    });
}

const initialState = {
    status: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        NEW_FORUM_POST_WAS_SUCCESSFUL: newForumPostWasSuccessful,
        NEW_FORUM_POST_WAS_UNSUCCESSFUL: newForumPostWasUnsuccessful,

        RESET_NEW_FORUM_POST_STATUS: resetNewForumPostStatus
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;