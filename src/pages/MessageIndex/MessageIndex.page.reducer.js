import { updateObject } from '../../utils/updateObject';
import { GET_USER_AND_MESSAGE_COUNT_WAS_SUCCESSFUL, GET_USER_AND_MESSAGE_COUNT_WAS_UNSUCCESSFUL } from './index';


const getUserAndMessageCountWasSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        users: action.payload.data.users,
    });
}

const getUserAndMessageCountWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const initialState = {
    status: null,
    message: null,
    users: []
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_USER_AND_MESSAGE_COUNT_WAS_SUCCESSFUL: getUserAndMessageCountWasSuccessful,
        GET_USER_AND_MESSAGE_COUNT_WAS_UNSUCCESSFUL: getUserAndMessageCountWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;