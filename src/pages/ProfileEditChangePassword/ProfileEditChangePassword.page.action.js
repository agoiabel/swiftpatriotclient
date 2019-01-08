import { post } from '../../utils/http_client.js';
import { UPDATE_PASSWORD_WAS_SUCCESSFUL, UPDATE_PASSWORD_WAS_UNSUCCESSFUL } from './index';

export const update_password = payload => async dispatch => {
    try {
        let response = await post(payload, 'password/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_user_unsuccessful(response));
            }));
        }
        dispatch(update_user_successful(response));
    } catch (error) {
        console.dir(error);
    }
}
export const update_user_successful = payload => {
    return {
        type: UPDATE_PASSWORD_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const update_user_unsuccessful = payload => {
    return {
        type: UPDATE_PASSWORD_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const reset_password_status = payload => {
    return {
        type: reset_password_status,
        payload: payload
    }
}