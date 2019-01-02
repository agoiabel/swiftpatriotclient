import { get, post } from '../../utils/http_client.js';
import { GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL, GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL, GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL } from './index';

export const get_active_and_future_session = () => async dispatch => {

    try {
        let response = await get('session/active_and_future');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_active_and_future_session_unsuccessful());
            }));
        }

        dispatch(get_active_and_future_session_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_active_and_future_session_successful = payload => {
    return {
        type: GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL,
        payload: payload
    };
}
export const get_active_and_future_session_unsuccessful = payload => {
    return {
        type: GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL,
        payload: payload
    }
}



export const get_session_with = payload => async dispatch => {

    try {
        let response = await get(`session/show/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_session_was_unsuccessful());
            }));
        }

        dispatch(get_session_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_session_was_successful = payload => {
    return {
        type: GET_SESSION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_session_was_unsuccessful = payload => {
    return {
        type: GET_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}
