import { get, post } from '../../../utils/http_client.js';
import { 
    GET_FACILITATORS_SUCCESSFUL, GET_FACILITATORS_UNSUCCESSFUL, RESET_STORE_FACILITATOR_STATUS, 
    STORE_FACILITATOR_WAS_SUCCESSFUL, STORE_FACILITATOR_WAS_UNSUCCESSFUL, DELETE_FACILITATOR_WAS_SUCCESSFUL, 
    DELETE_FACILITATOR_WAS_UNSUCCESSFUL, GET_FACILITATOR, UPDATE_FACILITATOR_WAS_SUCCESSFUL, UPDATE_FACILITATOR_WAS_UNSUCCESSFUL
} from './index';

export const get_facilitators = payload => async dispatch => {

    try {
        let response = await get(`facilitator/index/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_facilitators_unsuccessful());
            }));
        }
        dispatch(get_facilitators_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_facilitators_successful = payload => {
    return {
        type: GET_FACILITATORS_SUCCESSFUL,
        payload: payload
    };
}
export const get_facilitators_unsuccessful = payload => {
    return {
        type: GET_FACILITATORS_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_facilitator = payload => async dispatch => {
    try {
        let response = await post(payload, 'facilitator/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_facilitator_was_unsuccessful());
            }));
        }
        dispatch(store_facilitator_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_facilitator_was_successful = payload => {
    return {
        type: STORE_FACILITATOR_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_facilitator_was_unsuccessful = payload => {
    return {
        type: STORE_FACILITATOR_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_facilitator_status = () => {
    return {
        type: RESET_STORE_FACILITATOR_STATUS
    }
}


export const deleteFacilitator = payload => async dispatch => {
    try {
        let response = await get(`facilitator/delete/${payload.facilitatorId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_facilitator_was_unsuccessful());
            }));
        }

        dispatch(delete_facilitator_was_successful({
            facilitatorId: payload.facilitatorId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_facilitator_was_successful = payload => {
    return {
        type: DELETE_FACILITATOR_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_facilitator_was_unsuccessful = payload => {
    return {
        type: DELETE_FACILITATOR_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_facilitator = payload => {
    return {
        type: GET_FACILITATOR,
        payload: payload
    }
}


export const update_facilitator = payload => async dispatch => {
    try {
        let response = await post(payload, 'facilitator/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_facilitator_was_unsuccessful());
            }));
        }

        dispatch(update_facilitator_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_facilitator_was_successful = payload => {
    return {
        type: UPDATE_FACILITATOR_WAS_SUCCESSFUL,
        payload: payload
    };
}

export const update_facilitator_was_unsuccessful = payload => {
    return {
        type: UPDATE_FACILITATOR_WAS_UNSUCCESSFUL,
        payload: payload
    }
}