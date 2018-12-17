import { setStorage } from '../../utils/storage';
import { post } from '../../utils/http_client';
import { FORGOT_PASSWORD_SUCCESSFUL, FORGOT_PASSWORD_UNSUCCESSFUL } from './index';

export const start_forgot_password = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'user/forgotpassword');

            response = await response.json();

            const responsePayload = {
                status: response.status,
                message: `${response.message} ${Date.now()}`
            }

            if (response.status !== 200) {
                return window.setTimeout((() => {
                    dispatch(forgot_password_unsucessful(responsePayload));
                }));
            }

            return dispatch(forgot_password_sucessful(responsePayload));
        } catch (error) {
            console.dir(error);
        }

    }
};


export const forgot_password_sucessful = payload => {
    return {
        type: FORGOT_PASSWORD_SUCCESSFUL,
        payload: payload
    };
}


export const forgot_password_unsucessful = payload => {
    return {
        type: FORGOT_PASSWORD_UNSUCCESSFUL,
        payload: payload
    }
}