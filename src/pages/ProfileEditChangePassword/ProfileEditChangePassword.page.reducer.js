import { updateObject } from '../../utils/updateObject';
import { UPDATE_PASSWORD_WAS_SUCCESSFUL, UPDATE_PASSWORD_WAS_UNSUCCESSFUL, RESET_PROFILE_STATUS } from './index';


const updatePasswordWasSuccessful = (state, action) => {
    return updateObject(state, {
        user: action.payload.data,
        status: action.payload.status,
    });
}

const updatePasswordWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        message: action.payload.message,
        status: action.payload.status,
    });
}

const resetPasswordStatus = (state, action) => {
    return updateObject(state, {
        status: null,
    });
}

const initialState = {
    user: null,
    status: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        UPDATE_PASSWORD_WAS_SUCCESSFUL: updatePasswordWasSuccessful,
        UPDATE_PASSWORD_WAS_UNSUCCESSFUL: updatePasswordWasUnsuccessful,

        RESET_PROFILE_STATUS: resetPasswordStatus
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;