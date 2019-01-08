import { get, post } from '../../utils/http_client.js';
import {
    GET_TRANSACTION_WAS_SUCCESSFUL, GET_TRANSACTION_WAS_UNSUCCESSFUL
} from './index';

export const get_payment_for_user = () => async dispatch => {

    try {
        let response = await get('transaction/me');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_payment_for_user_unsuccessful(response));
            }));
        }
        dispatch(get_payment_for_user_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_payment_for_user_successful = payload => {
    return {
        type: GET_TRANSACTION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_payment_for_user_unsuccessful = payload => {
    return {
        type: GET_TRANSACTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}
