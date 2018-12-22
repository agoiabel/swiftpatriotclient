import { updateObject } from '../../utils/updateObject';
import { GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL, GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL } from './index';

const getActiveAndFutureSessionsSuccessful = (state, action) => {
    return updateObject(state, {
        sessions: action.payload.data,
        get_active_and_future_session_status: action.payload.status,
    });
}

const getActiveAndFutureSessionsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_outline_status: action.payload.status,
        get_outline_message: action.payload.message,
    });
}

const initialState = {
    sessions: [],
    session: null,
    get_active_and_future_session_status: null,
    get_active_and_future_session_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL: getActiveAndFutureSessionsSuccessful,
        GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL: getActiveAndFutureSessionsUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;
