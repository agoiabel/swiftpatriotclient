import { updateObject } from '../../utils/updateObject';
import { GET_BATCH_SUCCESSFUL, GET_BATCH_UNSUCCESSFUL, BATCH_VERIFICATION_SUCCESSFUL, BATCH_VERIFICATION_UNSUCCESSFUL, REJECT_CANDIDATE_UNSUCCESSFUL, REJECT_CANDIDATE_SUCCESSFUL } from './index';

const getBatchSuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        candidates: action.payload.data
    });
}

const getBatchUnsuccessful = (state, action) => {
    return updateObject(state, {
        status: action.payload.status,
        message: action.payload.message,
    });
}

const getVerificationSuccessful = (state, action) => {
    return updateObject(state, {
        batch_updated_status: action.payload.status,
        batch_updated_message: action.payload.message,
    });
}

const candidateRejection = (state, action) => {
    return updateObject(state, {
        candidate_rejected_status: action.payload.status,
        candidate_rejected_message: action.payload.message,
    });
}

const resetCandidate = (state, action) => {
    return updateObject(state, {
        candidate_rejected_status: null,
        candidate_rejected_message: null,
    });
}

const resetBatchUpdate = (state, action) => {
    return updateObject(state, {
        batch_updated_status: null,
        batch_updated_message: null,
    });
}


const initialState = {
    status: null,
    message: null,
    candidates: [],
    batch_updated_status: null,
    batch_updated_message: null,
    candidate_rejected_status: null,
    candidate_rejected_message: null,
};

const reducer = (state = initialState, action) => {
    const lookup = {
        RESET_CANDIDATE: resetCandidate,
        GET_BATCH_SUCCESSFUL: getBatchSuccessful,
        GET_BATCH_UNSUCCESSFUL: getBatchUnsuccessful,

        REJECT_CANDIDATE_SUCCESSFUL: candidateRejection,
        REJECT_CANDIDATE_UNSUCCESSFUL: candidateRejection,

        BATCH_VERIFICATION_SUCCESSFUL: getVerificationSuccessful,
        BATCH_VERIFICATION_UNSUCCESSFUL: getVerificationSuccessful,

        RESET_BATCH_UPDATE: resetBatchUpdate
    }

    return lookup[action.type] ? lookup[action.type](state, action) : state;
}

export default reducer;