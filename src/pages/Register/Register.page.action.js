import { post } from '../../utils/http_client';
import { REGISTRATION_SUCCESSFUL, REGISTRATION_UNSUCCESSFUL } from './index';

export const start_registration = payload => async dispatch => {

    try {
        let response = await post(payload, 'user/store');

        response = await response.json();

        if (response.status === 422) {
            return window.setTimeout((() => {
                dispatch(registration_unsuccessful(response));
            }));
        }

        //pass the token to redux
        dispatch(registration_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const registration_successful = payload => {
    return {
        type: REGISTRATION_SUCCESSFUL,
        payload: payload
    };
}


export const registration_unsuccessful = payload => {
    return {
        type: REGISTRATION_UNSUCCESSFUL,
        payload: payload
    }
}