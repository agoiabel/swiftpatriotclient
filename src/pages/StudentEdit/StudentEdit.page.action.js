import { get, post } from '../../utils/http_client.js';
import {
    GET_USER_SUCCESSFUL, GET_USER_UNSUCCESSFUL, UPDATE_STUDENT_SUCCESSFUL, UPDATE_STUDENT_UNSUCCESSFUL, RESET
} from './index';

export const get_user = payload => async dispatch => {

    try {
        let response = await get(`user/show/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_user_unsuccessful(response));
            }));
        }
        dispatch(get_user_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_user_successful = payload => {
    return {
        type: GET_USER_SUCCESSFUL,
        payload: payload
    };
}
export const get_user_unsuccessful = payload => {
    return {
        type: GET_USER_UNSUCCESSFUL,
        payload: payload
    }
}




export const reset = () => {
    return {
        type: RESET
    }
}




export const update_student = payload => async dispatch => {

    try {
        let response = await post(payload, `student/update`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_student_unsuccessful(response));
            }));
        }
        dispatch(update_student_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const update_student_successful = payload => {
    return {
        type: UPDATE_STUDENT_SUCCESSFUL,
        payload: payload
    };
}
export const update_student_unsuccessful = payload => {
    return {
        type: UPDATE_STUDENT_UNSUCCESSFUL,
        payload: payload
    }
}
