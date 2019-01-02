import { get, post } from '../../../utils/http_client.js';
import { 
    GET_QUESTIONS_SUCCESSFUL, GET_QUESTIONS_UNSUCCESSFUL, RESET_STORE_QUESTION_STATUS, 
    STORE_QUESTION_WAS_SUCCESSFUL, STORE_QUESTION_WAS_UNSUCCESSFUL, DELETE_QUESTION_WAS_SUCCESSFUL, 
    DELETE_QUESTION_WAS_UNSUCCESSFUL, GET_QUESTION, UPDATE_QUESTION_WAS_SUCCESSFUL, UPDATE_QUESTION_WAS_UNSUCCESSFUL
} from './index';

export const get_questions = () => async dispatch => {

    try {
        let response = await get('feedback-question/index');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_questions_unsuccessful());
            }));
        }
        dispatch(get_questions_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_questions_successful = payload => {
    return {
        type: GET_QUESTIONS_SUCCESSFUL,
        payload: payload
    };
}
export const get_questions_unsuccessful = payload => {
    return {
        type: GET_QUESTIONS_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_question = payload => async dispatch => {
    try {
        let response = await post(payload, 'feedback-question/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_question_was_unsuccessful());
            }));
        }
        dispatch(store_question_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_question_was_successful = payload => {
    return {
        type: STORE_QUESTION_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_question_was_unsuccessful = payload => {
    return {
        type: STORE_QUESTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_question_status = () => {
    return {
        type: RESET_STORE_QUESTION_STATUS
    }
}


export const deleteQuestion = payload => async dispatch => {
    try {
        let response = await get(`feedback-question/delete/${payload.feedbackQuestionId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_question_was_unsuccessful());
            }));
        }

        dispatch(delete_question_was_successful({
            feedbackQuestionId: payload.feedbackQuestionId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_question_was_successful = payload => {
    return {
        type: DELETE_QUESTION_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_question_was_unsuccessful = payload => {
    return {
        type: DELETE_QUESTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_question = payload => {
    return {
        type: GET_QUESTION,
        payload: payload
    }
}


export const update_question = payload => async dispatch => {
    try {
        let response = await post(payload, 'feedback-question/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_question_was_unsuccessful());
            }));
        }

        dispatch(update_question_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_question_was_successful = payload => {
    return {
        type: UPDATE_QUESTION_WAS_SUCCESSFUL,
        payload: payload
    };
}

export const update_question_was_unsuccessful = payload => {
    return {
        type: UPDATE_QUESTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}