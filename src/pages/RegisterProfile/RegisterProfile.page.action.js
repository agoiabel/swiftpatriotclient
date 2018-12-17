import { post } from '../../utils/http_client';
import { setStorage } from '../../utils/storage';
import { REGISTER_PROFILE_SUCCESSFUL, REGISTER_PROFILE_UNSUCCESSFUL } from './index';

export const start_register_profile = payload => async dispatch => {

    try {
        let response = await post(payload, 'complete_profile/store');

        response = await response.json();

        if (response.status === 422) {
            return window.setTimeout((() => {
                dispatch(register_profile_unsuccessful(response));
            }));
        }

        try {
            await setStorage("DayStar:auth_token", response.data.auth_token);
            await setStorage("DayStar:role_id", response.data.role_id);
        } catch (error) {
            console.dir('Error storing in storage');
        }

        //pass the token to redux
        dispatch(register_profile_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const register_profile_successful = payload => {
    return {
        type: REGISTER_PROFILE_SUCCESSFUL,
        payload: payload
    };
}


export const register_profile_unsuccessful = payload => {
    return {
        type: REGISTER_PROFILE_UNSUCCESSFUL,
        payload: payload
    }
}