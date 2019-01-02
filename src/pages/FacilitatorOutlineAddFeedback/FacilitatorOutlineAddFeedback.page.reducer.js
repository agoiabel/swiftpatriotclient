import { updateObject } from '../../utils/updateObject';
import { 
    GET_OUTLINE_FEEDBACK_DATA_WAS_SUCCESSFUL, GET_OUTLINE_FEEDBACK_DATA_WAS_UNSUCCESSFUL,
    STORE_FEEDBACK_WAS_SUCCESSFUL, STORE_FEEDBACK_WAS_UNSUCCESSFUL
} from './index';

const outlineFeedbackWasSuccessful = (state, action) => {
    return updateObject(state, {
        questions: action.payload.data.questions,
        get_facilitator_outline_status: action.payload.status,
        facilitator_outline: action.payload.data.facilitatorOutline
    });
}

const outlineFeedbackWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        facilitator_outlines: action.payload.data,
        get_facilitator_outline_status: action.payload.status,
        get_facilitator_outline_message: action.payload.message
    });
}

const storeFeedbackWasSuccessful = (state, action) => {
    return updateObject(state, {
        store_facilitator_outline_status: action.payload.status,
        store_facilitator_outline_message: action.payload.message
    });
}

const storeFeedbackWasUnsuccessful = (state, action) => {
    return updateObject(state, {
        store_facilitator_outline_status: 422,
        store_facilitator_outline_message: action.payload.message
    });
}


const resetStoreFacilitatorOutlineStatus = (state, action) => {
    return updateObject(state, {
        get_facilitator_outline_status: null,
        store_facilitator_outline_status: null
    });
}

const initialState = {
    questions: [],
    facilitator_outline: null,

    get_facilitator_outline_status: null,

    store_facilitator_outline_status: null,
    store_facilitator_outline_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        RESET_STORE_FACILITATOR_OUTLINE_STATUS: resetStoreFacilitatorOutlineStatus,

        GET_OUTLINE_FEEDBACK_DATA_WAS_SUCCESSFUL: outlineFeedbackWasSuccessful,
        GET_OUTLINE_FEEDBACK_DATA_WAS_UNSUCCESSFUL: outlineFeedbackWasUnsuccessful,

        STORE_FEEDBACK_WAS_SUCCESSFUL: storeFeedbackWasSuccessful,
        STORE_FEEDBACK_WAS_UNSUCCESSFUL: storeFeedbackWasUnsuccessful,

        RESET_STORE_FEEDBACK: resetStoreFacilitatorOutlineStatus
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;