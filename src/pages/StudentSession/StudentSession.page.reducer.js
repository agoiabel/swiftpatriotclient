import { updateObject } from '../../utils/updateObject';
import { GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL, GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL, GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL } from './index';

const getActiveAndFutureSessionsSuccessful = (state, action) => {
    return updateObject(state, {
        sessions: action.payload.data,
        get_active_and_future_session_status: action.payload.status,
    });
}

const getActiveAndFutureSessionsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_active_and_future_session_status: action.payload.status,
        get_active_and_future_session_message: action.payload.message,
    });
}


const getSessionWasSuccessful = (state, action) => {
    return updateObject(state, {
        session: action.payload.data.session,
        get_session_status: action.payload.status,
        transaction: action.payload.data.transaction
    });
}

const getSessionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_session_status: action.payload.status,
        get_session_message: action.payload.message,
    });
}


const initialState = {
    // sessions: [],

    session: null,
    transaction: null,

    get_session_status: null,
    get_session_message: null,

    session_number: null,
    session_number_status: null,

    get_active_and_future_session_status: null,
    get_active_and_future_session_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL: getActiveAndFutureSessionsSuccessful,
        GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL: getActiveAndFutureSessionsUnsuccessful,

        GET_SESSION_WAS_SUCCESSFUL: getSessionWasSuccessful,
        GET_SESSION_WAS_UNSUCCESSFUL: getSessionWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;
