import { get, post } from '../../../utils/http_client.js';
import { 
    GET_OUTLINES_SUCCESSFUL, GET_OUTLINES_UNSUCCESSFUL, RESET_STORE_OUTLINE_STATUS, 
    STORE_OUTLINE_WAS_SUCCESSFUL, STORE_OUTLINE_WAS_UNSUCCESSFUL, DELETE_OUTLINE_WAS_SUCCESSFUL, 
    DELETE_OUTLINE_WAS_UNSUCCESSFUL, GET_OUTLINE, UPDATE_OUTLINE_WAS_SUCCESSFUL, UPDATE_OUTLINE_WAS_UNSUCCESSFUL
} from './index';

export const get_outlines = () => async dispatch => {

    try {
        let response = await get('outline/index');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_outlines_unsuccessful());
            }));
        }
        dispatch(get_outlines_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_outlines_successful = payload => {
    return {
        type: GET_OUTLINES_SUCCESSFUL,
        payload: payload
    };
}
export const get_outlines_unsuccessful = payload => {
    return {
        type: GET_OUTLINES_UNSUCCESSFUL,
        payload: payload
    }
}

export const store_outline = payload => async dispatch => {
    try {
        let response = await post(payload, 'outline/store');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_outline_was_unsuccessful());
            }));
        }
        dispatch(store_outline_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_outline_was_successful = payload => {
    return {
        type: STORE_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_outline_was_unsuccessful = payload => {
    return {
        type: STORE_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_store_outline_status = () => {
    return {
        type: RESET_STORE_OUTLINE_STATUS
    }
}


export const deleteOutline = payload => async dispatch => {
    try {
        let response = await get(`outline/delete/${payload.outlineId}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(delete_outline_was_unsuccessful());
            }));
        }

        dispatch(delete_outline_was_successful({
            outlineId: payload.outlineId,
            status: response.status
        }));
    } catch (error) {
        console.dir(error);
    }
}


export const delete_outline_was_successful = payload => {
    return {
        type: DELETE_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    }
}


export const delete_outline_was_unsuccessful = payload => {
    return {
        type: DELETE_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}

export const get_outline = payload => {
    return {
        type: GET_OUTLINE,
        payload: payload
    }
}


export const update_outline = payload => async dispatch => {
    try {
        let response = await post(payload, 'outline/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_outline_was_unsuccessful());
            }));
        }

        dispatch(update_outline_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const update_outline_was_successful = payload => {
    return {
        type: UPDATE_OUTLINE_WAS_SUCCESSFUL,
        payload: payload
    };
}

export const update_outline_was_unsuccessful = payload => {
    return {
        type: UPDATE_OUTLINE_WAS_UNSUCCESSFUL,
        payload: payload
    }
}