import { get, post } from '../../../utils/http_client.js';
import { 
    GET_FACILITATOR_OUTLINES_SUCCESSFUL, GET_FACILITATOR_OUTLINES_UNSUCCESSFUL, RESET_STORE_FACILITATOR_OUTLINE_STATUS, 
    STORE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL, STORE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL, DELETE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL, 
    DELETE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL, GET_FACILITATOR_OUTLINE, UPDATE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL, UPDATE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL
} from './index';

export const get_facilitator_outlines = payload => async dispatch => {

    try {
        let response = await get(`facilitator-outline/show/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_facilitator_outlines_unsuccessful());
            }));
        }
        dispatch(get_facilitator_outlines_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_facilitator_outlines_successful = payload => {
    return {
        type: GET_FACILITATOR_OUTLINES_SUCCESSFUL,
        payload: payload
    };
}
export const get_facilitator_outlines_unsuccessful = payload => {
    return {
        type: GET_FACILITATOR_OUTLINES_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_facilitator_outline = payload => async dispatch => {
    try {
        let response = await post(payload, 'facilitator-outline/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_facilitator_outline_was_unsuccessful());
            }));
        }
        dispatch(store_facilitator_outline_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_facilitator_outline_was_successful = payload => {
    return {
        type: STORE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_facilitator_outline_was_unsuccessful = payload => {
    return {
        type: STORE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_facilitator_outline_status = () => {
    return {
        type: RESET_STORE_FACILITATOR_OUTLINE_STATUS
    }
}


export const delete_facilitator_outline = payload => async dispatch => {
    try {
        let response = await get(`facilitator-outline/delete/${payload.facilitator_outline_id}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_facilitator_outline_was_unsuccessful());
            }));
        }

        dispatch(delete_facilitator_outline_was_successful({
            facilitator_outlineId: payload.facilitator_outline_id,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_facilitator_outline_was_successful = payload => {
    return {
        type: DELETE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_facilitator_outline_was_unsuccessful = payload => {
    return {
        type: DELETE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_facilitator_outline = payload => {
    return {
        type: GET_FACILITATOR_OUTLINE,
        payload: payload
    }
}


export const update_facilitator_outline = payload => async dispatch => {
    try {
        let response = await post(payload, 'facilitator_outline/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_facilitator_outline_was_unsuccessful());
            }));
        }

        dispatch(update_facilitator_outline_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_facilitator_outline_was_successful = payload => {
    return {
        type: UPDATE_FACILITATOR_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    };
}

export const update_facilitator_outline_was_unsuccessful = payload => {
    return {
        type: UPDATE_FACILITATOR_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}