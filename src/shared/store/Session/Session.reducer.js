import { updateObject } from '../../../utils/updateObject';
import { 
    STORE_SESSION, GET_SESSIONS_SUCCESSFUL, GET_SESSIONS_UNSUCCESSFUL, STORE_SESSION_WAS_SUCCESSFUL, STORE_SESSION_WAS_UNSUCCESSFUL, 
    GET_SESSION, DELETE_SESSION_WAS_SUCCESSFUL, DELETE_SESSION_WAS_UNSUCCESSFUL, ACTIVATE_SESSION_WAS_SUCCESSFUL, ACTIVATE_SESSION_WAS_UNSUCCESSFUL 
} from './index';

const getSessionsSuccessful = (state, action) => {
    return updateObject(state, {
        sessions: action.payload.data,
        get_session_status: action.payload.status,
        get_session_message: action.payload.message
    });
}

const getSessionsUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_session_status: action.payload.status,
        get_session_message: action.payload.message,
    });
}

const storeSessionWasSuccessful = (state, action) => {
    return {
        ...state,
        store_session_status: action.payload.status,
        sessions: [...state.sessions, action.payload.data]
    }
}

const storeSessionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        store_session_status: action.payload.status,
        store_session_message: action.payload.message
    }
}


const updateSessionWasSuccessful = (state, action) => {
    const newSessionArray = [...state.sessions].filter(session => {
        return session.id !== action.payload.data.id
    });
    const updatedSessionArray = [...newSessionArray, action.payload.data];

    return {
        ...state,
        update_session_status: action.payload.status,
        sessions: updatedSessionArray
    }
}

const updateSessionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        update_session_status: action.payload.status,
        update_session_message: action.payload.message
    }
}



const resetStoreSessionStatus = (state, action) => {
    return {
        ...state,
        get_session_message: null,

        store_session_status: null,
        store_session_message: null,

        delete_session_status: null,
        delete_session_message: null, 

        update_session_status: null,
        update_session_message: null,

        activate_session_status: null,
        activate_session_message: null,
    }
}

const deleteSessionWasSuccessful = (state, action) => {
    const oldSessionArray = [...state.sessions];

    const newSessionArray = oldSessionArray.filter(session => {
        return session.id !== action.payload.sessionId
    });

    return {
        ...state,
        sessions: newSessionArray,
        delete_session_status: 200
    }
}

const deleteSessionWasUnsuccessful = (state, action) => {
    return {
        ...state
    }
}

const activateSessionWasSuccessful = (state, action) => {
    return {
        ...state,
        activate_session_status: 200
    }
}

const activateSessionWasUnsuccessful = (state, action) => {
    return {
        ...state,
        activate_session_status: 422
    }
}

const getSession = (state, action) => {
    const session = [...state.sessions].find(session => {
        return session.id == action.payload;
    });

    return {
        ...state,
        session: session
    }
}

const initialState = {
    sessions: [],
    session: null,
    
    get_session_status: null,
    get_session_message: null,
    
    store_session_status: null,
    store_session_message: null,

    delete_session_status: null,
    delete_session_message: null,

    activate_session_status: null,
    activate_session_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_SESSION: getSession,
        GET_SESSIONS_SUCCESSFUL: getSessionsSuccessful,
        GET_SESSIONS_UNSUCCESSFUL: getSessionsUnsuccessful,
        RESET_STORE_SESSION_STATUS: resetStoreSessionStatus,

        STORE_SESSION_WAS_SUCCESSFUL: storeSessionWasSuccessful,
        STORE_SESSION_WAS_UNSUCCESSFUL: storeSessionWasUnsuccessful,

        DELETE_SESSION_WAS_SUCCESSFUL: deleteSessionWasSuccessful,
        DELETE_SESSION_WAS_UNSUCCESSFUL: deleteSessionWasUnsuccessful,

        UPDATE_SESSION_WAS_SUCCESSFUL: updateSessionWasSuccessful,
        UPDATE_SESSION_WAS_UNSUCCESSFUL: updateSessionWasUnsuccessful,

        ACTIVATE_SESSION_WAS_SUCCESSFUL: activateSessionWasSuccessful,
        ACTIVATE_SESSION_WAS_UNSUCCESSFUL: activateSessionWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;