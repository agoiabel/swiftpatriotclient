import { get, post } from '../../utils/http_client.js';
import {
    GET_SESSION_STUDENT_SUCCESSFUL, GET_SESSION_STUDENT_UNSUCCESSFUL,
} from './index';


export const get_session_students = payload => async dispatch => {

    try {
        let response = await get(`session/student/${payload}`);

        response = await response.json();

        console.dir(response);

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch( get_session_student_was_unsuccessful(response) );
            }));
        }
        dispatch( get_session_student_was_successful(response) );
    } catch (error) {
        console.dir(error);
    }

};


export const get_session_student_was_successful = payload => {
    return {
        type: GET_SESSION_STUDENT_SUCCESSFUL,
        payload: payload
    };
}
export const get_session_student_was_unsuccessful = payload => {
    return {
        type: GET_SESSION_STUDENT_UNSUCCESSFUL,
        payload: payload
    }
}

export const reset = payload => {
    return {
        type: GET_SESSION_STUDENT_UNSUCCESSFUL,
        payload: payload
    }
}
