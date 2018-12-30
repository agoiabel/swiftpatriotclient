import { get, post } from '../../../utils/http_client.js';
import { 
    GET_TRANSACTION_SUCCESSFUL, GET_TRANSACTION_UNSUCCESSFUL,
    UPDATE_TRANSACTION_SUCCESSFUL, UPDATE_TRANSACTION_UNSUCCESSFUL, RESET_UPDATE_TRANSACTION_STATUS
} from './index';



export const get_transaction_for = payload => async dispatch => {

    try {
        let response = await get(`transaction/index/${payload.session_id}/${payload.status}`);

        response = await response.json();

        console.dir(response);

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_outlines_unsuccessful(response));
            }));
        }
        dispatch(get_outlines_successful(response));
    } catch (error) {
        console.dir(error);
    }

};


export const get_outlines_successful = payload => {
    return {
        type: GET_TRANSACTION_SUCCESSFUL,
        payload: payload
    };
}
export const get_outlines_unsuccessful = payload => {
    return {
        type: GET_TRANSACTION_UNSUCCESSFUL,
        payload: payload
    }
}



export const update_transaction = payload => async dispatch => {

    try {
        let response = await post(payload, 'transaction/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_transaction_unsuccessful(response));
            }));
        }
        dispatch(update_transaction_successful(response));
    } catch (error) {
        console.dir(error);
    }

};

export const update_transaction_successful = payload => {
    return {
        type: UPDATE_TRANSACTION_SUCCESSFUL,
        payload: payload
    };
}
export const update_transaction_unsuccessful = payload => {
    return {
        type: UPDATE_TRANSACTION_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_update_transaction_status = () => {
    return {
        type: RESET_UPDATE_TRANSACTION_STATUS
    }
}