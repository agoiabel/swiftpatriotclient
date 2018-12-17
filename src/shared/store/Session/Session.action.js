import { get, post } from '../../../utils/http_client.js';
import { 
    GET_SESSIONS_SUCCESSFUL, GET_SESSIONS_UNSUCCESSFUL, RESET_STORE_SESSION_STATUS, 
    STORE_SESSION_WAS_SUCCESSFUL, STORE_SESSION_WAS_UNSUCCESSFUL, DELETE_SESSION_WAS_SUCCESSFUL, 
    DELETE_SESSION_WAS_UNSUCCESSFUL, GET_SESSION, UPDATE_SESSION_WAS_SUCCESSFUL, UPDATE_SESSION_WAS_UNSUCCESSFUL,
    ACTIVATE_SESSION_WAS_SUCCESSFUL, ACTIVATE_SESSION_WAS_UNSUCCESSFUL
} from './index';

export const get_sessions = () => async dispatch => {

    try {
        let response = await get('session/index');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_sessions_unsuccessful());
            }));
        }

        dispatch(get_sessions_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_sessions_successful = payload => {
    return {
        type: GET_SESSIONS_SUCCESSFUL,
        payload: payload
    };
}
export const get_sessions_unsuccessful = payload => {
    return {
        type: GET_SESSIONS_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_session = payload => async dispatch => {
    try {


        let response = await post(payload, 'session/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_session_was_unsuccessful());
            }));
        }

        dispatch(store_session_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_session_was_successful = payload => {
    return {
        type: STORE_SESSION_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_session_was_unsuccessful = payload => {
    return {
        type: STORE_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_session_status = () => {
    return {
        type: RESET_STORE_SESSION_STATUS
    }
}


export const deleteSession = payload => async dispatch => {
    try {

        let response = await get(`session/delete/${payload.sessionId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_session_was_unsuccessful());
            }));
        }

        dispatch(delete_session_was_successful({
            arrayKey: payload.arrayKey,
            sessionId: payload.sessionId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_session_was_successful = payload => {
    return {
        type: DELETE_SESSION_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_session_was_unsuccessful = payload => {
    return {
        type: DELETE_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_session = payload => {
    return {
        type: GET_SESSION,
        payload: payload
    }
}


export const update_session = payload => async dispatch => {
    try {

        let response = await post(payload, 'session/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_session_was_unsuccessful());
            }));
        }

        dispatch(update_session_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_session_was_successful = payload => {
    return {
        type: UPDATE_SESSION_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const update_session_was_unsuccessful = payload => {
    return {
        type: UPDATE_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const activate = payload => async dispatch => {
    try {

        let response = await get(`session/activate/${payload.sessionId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(activate_session_was_unsuccessful());
            }));
        }

        dispatch(activate_session_was_successful({
            sessionId: payload.sessionId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const activate_session_was_successful = payload => {
    return {
        type: ACTIVATE_SESSION_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const activate_session_was_unsuccessful = payload => {
    return {
        type: ACTIVATE_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}
