import { updateObject } from '../../utils/updateObject';
import {
    GET_USER_PROFILE_SUCCESSFUL, GET_USER_PROFILE_UNSUCCESSFUL,
    UPDATE_USER_PROFILE_SUCCESSFUL, UPDATE_USER_PROFILE_UNSUCCESSFUL, RESET_PROFILE_STATUS
} from './index';

const getUserProfileWasSuccessful = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        status: action.payload.status,
    });
}

const getUserProfileWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message
    });
}


const updateUserProfileWasSuccessful = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        update_profile_status: action.payload.status,
    });
}

const updateUserProfileWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        message: action.payload.message,
        update_profile_status: action.payload.status,
    });
}

const resetProfileStatus = (state, action) => {
    return updateObject(state, {
        update_profile_status: null,
    });
}

const initialState = {
    user: null,
    status: null,
    message: null,
    update_profile_status: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_USER_PROFILE_SUCCESSFUL: getUserProfileWasSuccessful,
        GET_USER_PROFILE_UNSUCCESSFUL: getUserProfileWasUnsuccessful,

        UPDATE_USER_PROFILE_SUCCESSFUL: updateUserProfileWasSuccessful,
        UPDATE_USER_PROFILE_UNSUCCESSFUL: updateUserProfileWasUnsuccessful,

        RESET_PROFILE_STATUS: resetProfileStatus
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;