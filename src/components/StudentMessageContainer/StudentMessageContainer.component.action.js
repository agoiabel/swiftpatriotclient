import { get } from '../../utils/http_client.js';
import { GET_USER_MESSAGES_WAS_SUCCESSFUL, GET_USER_MESSAGES_WAS_UNSUCCESSFUL } from './index';

export const get_user_messages = payload => async dispatch => {

    try {
        let response = await get(`message/index/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_user_messages_was_unsuccessful());
            }));
        }

        dispatch(get_user_messages_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_user_messages_was_successful = payload => {
    return {
        type: GET_USER_MESSAGES_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_user_messages_was_unsuccessful = payload => {
    return {
        type: GET_USER_MESSAGES_WAS_UNSUCCESSFUL,
        payload: payload
    }
}