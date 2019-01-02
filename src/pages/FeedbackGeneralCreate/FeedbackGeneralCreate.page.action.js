import { get, post } from '../../utils/http_client.js';
import { 
    RESET_GENERAL_FEEDBACK_STATUS, 
    GET_GENERAL_QUESTION_WAS_SUCCESSFUL, GET_GENERAL_QUESTION_WAS_UNSUCCESSFUL, 
    STORE_GENERAL_FEEDBACK_WAS_SUCCESSFUL, STORE_GENERAL_FEEDBACK_WAS_UNSUCCESSFUL 
} from './index';

export const get_general_questions = payload => async dispatch => {
    try {
        let response = await get(`feedback-question/index/${payload.question_type}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_general_questions_was_unsuccessful());
            }));
        }

        dispatch(get_general_questions_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};

export const get_general_questions_was_successful = payload => {
    return {
        type: GET_GENERAL_QUESTION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_general_questions_was_unsuccessful = payload => {
    return {
        type: GET_GENERAL_QUESTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const store_feedback = payload => async dispatch => {
    try {
        let response = await post(payload, 'feedback/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_feedback_was_unsuccessful());
            }));
        }

        dispatch(store_feedback_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};

export const store_feedback_was_successful = payload => {
    return {
        type: STORE_GENERAL_FEEDBACK_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const store_feedback_was_unsuccessful = payload => {
    return {
        type: STORE_GENERAL_FEEDBACK_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const reset_store_feedback = payload => {
    return {
        type: RESET_GENERAL_FEEDBACK_STATUS,
        payload: payload
    }
}
