import { updateObject } from '../../utils/updateObject';
import { 
    RESET_GENERAL_FEEDBACK_STATUS, GET_GENERAL_QUESTION_WAS_SUCCESSFUL,
    GET_GENERAL_QUESTION_WAS_UNSUCCESSFUL, STORE_GENERAL_FEEDBACK_WAS_SUCCESSFUL, STORE_GENERAL_FEEDBACK_WAS_UNSUCCESSFUL
} from './index';

const generalQuestionWasSuccessful = (state, action) => {
    return updateObject(state, {
        generalQuestions: action.payload.data,
        get_questions_status: action.payload.status,
    });
}

const generalQuestionWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        get_questions_status: 422,
    });
}

const storeGeneralFeedbackWasSuccessful = (state, action) => {
    return updateObject(state, {
        store_general_feedback_status: action.payload.status,
        store_general_feedback_message: action.payload.message
    });
}

const storeGeneralFeedbackWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_general_feedback_status: 422,
        store_general_feedback_message: action.payload.message
    });
}


const resetGeneralFeedbackStatus = (state, action) => {
    return updateObject(state, {
        store_general_feedback_status: null,
        store_general_feedback_message: null
    });
}

const initialState = {
    generalQuestions: [],

    get_questions_status: null,

    store_general_feedback_status: null,
    store_general_feedback_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        RESET_GENERAL_FEEDBACK_STATUS: resetGeneralFeedbackStatus,

        GET_GENERAL_QUESTION_WAS_SUCCESSFUL: generalQuestionWasSuccessful,
        GET_GENERAL_QUESTION_WAS_UNSUCCESSFUL: generalQuestionWasUnsuccessful,

        STORE_GENERAL_FEEDBACK_WAS_SUCCESSFUL: storeGeneralFeedbackWasSuccessful,
        STORE_GENERAL_FEEDBACK_WAS_UNSUCCESSFUL: storeGeneralFeedbackWasUnsuccessful,
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;