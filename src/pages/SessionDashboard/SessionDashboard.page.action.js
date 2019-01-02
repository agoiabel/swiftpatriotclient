import { get } from '../../utils/http_client.js';
import { GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL } from './index';

export const get_session = payload => async dispatch => {

    try {
        let response = await get(`session/admin-show/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_session_unsuccessful(response));
            }));
        }

        dispatch(get_session_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_session_successful = payload => {
    return {
        type: GET_SESSION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_session_unsuccessful = payload => {
    return {
        type: GET_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}
