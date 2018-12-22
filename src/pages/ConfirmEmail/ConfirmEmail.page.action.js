import { post } from '../../utils/http_client';
import { EMAIL_CONFIRMED_SUCCESSFUL, EMAIL_CONFIRMED_UNSUCCESSFUL } from './index';

export const email_confirmation_start = payload => async dispatch => {

    const actionPayload = {
        token: payload
    };

    try {
        let response = await post(actionPayload, 'user/confirmEmail');

        response = await response.json();

        if (response.status === 422) {
            return window.setTimeout((() => {
                dispatch(email_confirm_unsucessful(response));
            }));
        }

        //pass the token to redux
        dispatch(email_confirm_sucessful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const email_confirm_sucessful = payload => {
    return {
        type: EMAIL_CONFIRMED_SUCCESSFUL,
        payload: payload
    };
}


export const email_confirm_unsucessful = payload => {
    return {
        type: EMAIL_CONFIRMED_UNSUCCESSFUL,
        payload: payload
    }
}