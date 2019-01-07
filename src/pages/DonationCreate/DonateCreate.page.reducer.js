import { updateObject } from '../../utils/updateObject.js';
import { DONATION_WAS_SUCCESSFUL, DONATION_WAS_UNSUCCESSFUL, RESET_DONATION_WAS_SUCCESSFUL_STATUS } from './index';


const newForumPostWasSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        transaction: action.payload.data
    });
}


const newForumPostWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const resetDonation = (state, action) => {
    return updateObject(state, {
        status: null,
        message: null,
        transaction: null
    });
}

const initialState = {
    status: null,
    message: null,
    transaction: null
};

const reducer = (state = initialState, action) => {
    const lookup = {
        DONATION_WAS_SUCCESSFUL: newForumPostWasSuccessful,
        DONATION_WAS_UNSUCCESSFUL: newForumPostWasUnsuccessful,

        RESET_DONATION_WAS_SUCCESSFUL_STATUS: resetDonation
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;