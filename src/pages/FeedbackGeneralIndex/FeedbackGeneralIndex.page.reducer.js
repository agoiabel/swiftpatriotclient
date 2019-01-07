import { updateObject } from '../../utils/updateObject';
import { GET_FEEDBACK_WAS_SUCCESSFUL, GET_FEEDBACK_WAS_UNSUCCESSFUL } from './index';

const getFeedbackWasSuccessful = (state, action) => {
    return updateObject(state, {
        feedbacks: action.payload.data,
        get_feedback_status: action.payload.status,
        get_feedback_message: action.payload.message
    });
}

const getFeedbackWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_question_status: action.payload.status,
        get_question_message: action.payload.message,
    });
}


const initialState = {
    feedbacks: [],
    get_feedback_status: null,
    get_feedback_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        GET_FEEDBACK_WAS_SUCCESSFUL: getFeedbackWasSuccessful,
        GET_FEEDBACK_WAS_UNSUCCESSFUL: getFeedbackWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;