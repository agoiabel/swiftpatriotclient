import { get } from '../../utils/http_client.js';
import { GET_FEEDBACK_WAS_SUCCESSFUL, GET_FEEDBACK_WAS_UNSUCCESSFUL } from './index';

export const get_feedbacks = payload => async dispatch => {

    try {
        let response = await get(`feedback/show/${payload.feedback_type}/${payload.session_id}`);

        response = await response.json();

        console.dir(response);

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_feedbacks_unsuccessful());
            }));
        }
        dispatch(get_feedbacks_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_feedbacks_successful = payload => {
    return {
        type: GET_FEEDBACK_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_feedbacks_unsuccessful = payload => {
    return {
        type: GET_FEEDBACK_WAS_UNSUCCESSFUL,
        payload: payload
    }
}