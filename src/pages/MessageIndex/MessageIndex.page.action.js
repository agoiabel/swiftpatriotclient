import { get, post } from '../../utils/http_client.js';
import { GET_USER_AND_MESSAGE_COUNT_WAS_SUCCESSFUL, GET_USER_AND_MESSAGE_COUNT_WAS_UNSUCCESSFUL } from './index';
import { SEND_MESSAGE_WAS_SUCCESSFUL, SEND_MESSAGE_WAS_UNSUCCESSFUL } from '../../components/StudentMessageContainer';

export const get_user_and_message_count = () => async dispatch => {

    try {
        let response = await get('user/index');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_user_and_message_count_was_unsuccessful());
            }));
        }

        dispatch(get_user_and_message_count_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_user_and_message_count_was_successful = payload => {
    return {
        type: GET_USER_AND_MESSAGE_COUNT_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_user_and_message_count_was_unsuccessful = payload => {
    return {
        type: GET_USER_AND_MESSAGE_COUNT_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const send_message_with = payload => async dispatch => {

    try {
        let response = await post(payload, 'message/store');

        response = await response.json();

        console.dir(response);

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(send_message_was_unsuccessful());
            }));
        }

        dispatch(send_message_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const send_message_was_successful = payload => {
    return {
        type: SEND_MESSAGE_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const send_message_was_unsuccessful = payload => {
    return {
        type: SEND_MESSAGE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}