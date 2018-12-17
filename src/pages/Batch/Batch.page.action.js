import { get } from '../../utils/http_client';
import { 
    RESET_CANDIDATE, GET_BATCH_SUCCESSFUL, RESET_BATCH_UPDATE,
    REJECT_CANDIDATE_SUCCESSFUL, REJECT_CANDIDATE_UNSUCCESSFUL, 
    BATCH_VERIFICATION_SUCCESSFUL, BATCH_VERIFICATION_UNSUCCESSFUL, GET_BATCH_UNSUCCESSFUL,
} from './index';


export const reset_batch_update_status = () => {
    return {
        type: RESET_BATCH_UPDATE,
    };
}

export const reset_candidate_status = () => {
    return {
        type: RESET_CANDIDATE,
    };
}

export const batch_verification = payload => async dispatch => {

    try {
        let response = await get(`/batch/adminbatchprocess?batchid=${payload.batchId}&status=${payload.status}&admin_coment=${payload.comment}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(batch_verification_unsuccessful());
            }));
        }

        dispatch(batch_verification_successful(response));
    } catch (error) {
        console.dir(error);
    }


}


export const batch_verification_successful = payload => {
    return {
        type: BATCH_VERIFICATION_SUCCESSFUL,
        payload: payload
    };
}


export const batch_verification_unsuccessful = payload => {
    return {
        type: BATCH_VERIFICATION_UNSUCCESSFUL,
        payload: payload
    }
}


export const reject_candidate = candidate => async dispatch => {

    try {
        let response = await get(`batch/rejectcandidate?candidateid=${candidate.id}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(candidate_rejected_unsuccessful(response));
            }));
        }

        dispatch(candidate_rejected_successful(response));
    } catch (error) {
        console.dir(error);
    }

    
} 


export const candidate_rejected_successful = payload => {
    return {
        type: REJECT_CANDIDATE_SUCCESSFUL,
        payload: payload
    };
}


export const candidate_rejected_unsuccessful = payload => {
    return {
        type: REJECT_CANDIDATE_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_batch = batchId => async dispatch => {

    try {
        let response = await get(`batch/batchcandidates/${batchId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_batch_unsuccessful());
            }));
        }

        dispatch(get_batch_successful(response));
    } catch (error) {
        console.dir(error);
    }


};


export const get_batch_successful = payload => {
    return {
        type: GET_BATCH_SUCCESSFUL,
        payload: payload
    };
}


export const get_batch_unsuccessful = payload => {
    return {
        type: GET_BATCH_UNSUCCESSFUL,
        payload: payload
    }
}