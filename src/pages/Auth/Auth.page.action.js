import { setStorage } from '../../utils/storage';
import { post } from '../../utils/http_client';
import { AUTH_SUCCESSFUL, AUTH_UNSUCCESSFUL } from './index';

export const start_login = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'authenticate/store');

            response = await response.json();

            if (response.status === 422) {
                return window.setTimeout((() => {
                    dispatch(auth_unsucessful(response));
                }));
            }

            try {
                await setStorage("DayStar:auth_token", response.data.auth_token);
                await setStorage("DayStar:role_id", response.data.role_id);
            } catch (error) {
                console.dir('Error storing in storage');
            }

            //pass the token to redux
            dispatch(auth_sucessful(response));
        } catch (error) {
            console.dir(error);
        }

    }
};


export const auth_sucessful = payload => {
    return {
        type: AUTH_SUCCESSFUL,
        payload: payload
    };
}


export const auth_unsucessful = payload => {
    return {
        type: AUTH_UNSUCCESSFUL,
        payload: payload
    }
}