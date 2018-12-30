import { updateObject } from '../../utils/updateObject';
import { GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL } from './index';

const getSessionWasSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
        session: action.payload.data
    });
}

const getSessionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const initialState = {
    session: null,
    status: null,
    message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_SESSION_WAS_SUCCESSFUL: getSessionWasSuccessful,
        GET_SESSION_WAS_UNSUCCESSFUL: getSessionWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;
