import { post } from '../../utils/http_client';
import { RESET_PASSWORD_SUCCESSFUL, RESET_PASSWORD_UNSUCCESSFUL } from './index';

export const start_reset_password = payload => async dispatch => {

    try {
        let response = await post(payload, 'forgot_password/update');

        response = await response.json();

        if (response.status === 422) {
            return window.setTimeout((() => {
                dispatch(reset_password_unsucessful(response));
            }));
        }

        return dispatch(reset_password_sucessful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const reset_password_sucessful = payload => {
    return {
        type: RESET_PASSWORD_SUCCESSFUL,
        payload: payload
    };
}


export const reset_password_unsucessful = payload => {
    return {
        type: RESET_PASSWORD_UNSUCCESSFUL,
        payload: payload
    }
}