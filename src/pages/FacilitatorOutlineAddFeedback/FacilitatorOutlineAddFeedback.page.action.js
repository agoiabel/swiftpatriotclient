import { get, post } from '../../utils/http_client.js';
import { GET_OUTLINE_FEEDBACK_DATA_WAS_SUCCESSFUL, GET_OUTLINE_FEEDBACK_DATA_WAS_UNSUCCESSFUL, STORE_FEEDBACK_WAS_SUCCESSFUL, STORE_FEEDBACK_WAS_UNSUCCESSFUL,RESET_STORE_FEEDBACK } from './index';

export const get_data = payload => async dispatch => {
    try {
        let response = await get(`outline-add-feedback/${payload.facilitator_outline_id}/${payload.question_type}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_outline_feedback_data_was_unsuccessful());
            }));
        }

        dispatch(get_outline_feedback_data_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};

export const get_outline_feedback_data_was_successful = payload => {
    return {
        type: GET_OUTLINE_FEEDBACK_DATA_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_outline_feedback_data_was_unsuccessful = payload => {
    return {
        type: GET_OUTLINE_FEEDBACK_DATA_WAS_UNSUCCESSFUL,
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
        type: STORE_FEEDBACK_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const store_feedback_was_unsuccessful = payload => {
    return {
        type: STORE_FEEDBACK_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const reset_store_feedback = payload => {
    return {
        type: RESET_STORE_FEEDBACK,
        payload: payload
    }
}
