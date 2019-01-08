import { get, post } from '../../utils/http_client.js';
import {
    GET_USER_PROFILE_SUCCESSFUL, GET_USER_PROFILE_UNSUCCESSFUL, UPDATE_USER_PROFILE_SUCCESSFUL, UPDATE_USER_PROFILE_UNSUCCESSFUL, RESET_PROFILE_STATUS
} from './index';



export const get_profile = payload => async dispatch => {

    try {
        let response = await get('user/me');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_profile_unsuccessful(response));
            }));
        }
        dispatch(get_profile_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_profile_successful = payload => {
    return {
        type: GET_USER_PROFILE_SUCCESSFUL,
        payload: payload
    };
}
export const get_profile_unsuccessful = payload => {
    return {
        type: GET_USER_PROFILE_UNSUCCESSFUL,
        payload: payload
    }
}



export const update_user = payload => async dispatch => {
    try {
        let response = await post(payload, 'user/update');

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
        type: UPDATE_USER_PROFILE_SUCCESSFUL,
        payload: payload
    };
}
export const update_user_unsuccessful = payload => {
    return {
        type: UPDATE_USER_PROFILE_UNSUCCESSFUL,
        payload: payload
    }
}

export const reset_profile_update = () => {
    return {
        type: RESET_PROFILE_STATUS
    }
}