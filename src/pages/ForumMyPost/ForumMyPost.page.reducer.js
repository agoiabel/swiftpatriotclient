import { updateObject } from '../../utils/updateObject';
import { GET_ACTIVE_FORUM_WAS_SUCCESSFUL, GET_ACTIVE_FORUM_WAS_UNSUCCESSFUL } from './index';


const getActiveForumWasSuccessful = (state, action) => {
    return updateObject(state, {
        forums: action.payload.data,
        status: action.payload.status,
    });
}

const getActiveForumWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}


const initialState = {
    forums: [],
    status: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_ACTIVE_FORUM_WAS_SUCCESSFUL: getActiveForumWasSuccessful,
        GET_ACTIVE_FORUM_WAS_UNSUCCESSFUL: getActiveForumWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;