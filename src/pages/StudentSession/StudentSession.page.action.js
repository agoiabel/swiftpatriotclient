import { get, post } from '../../utils/http_client.js';
import { GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL, GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL, 
    GET_SESSION_WAS_SUCCESSFUL, GET_SESSION_WAS_UNSUCCESSFUL,
    GET_SESSION_NUMBER_WAS_SUCCESSFUL, GET_SESSION_NUMBER_WAS_UNSUCCESSFUL,
    CONFIRM_TRANSACTION_WAS_SUCCESSFUL, CONFIRM_TRANSACTION_WAS_UNSUCCESSFUL,
    RESET_ONLINE_PAYMENT_TRANSACTION
} from './index';


export const get_active_and_future_session = () => async dispatch => {

    try {
        let response = await get('session/active_and_future');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_active_and_future_session_unsuccessful());
            }));
        }

        dispatch(get_active_and_future_session_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_active_and_future_session_successful = payload => {
    return {
        type: GET_ACTIVE_AND_FUTURE_SESSION_SUCCESSFUL,
        payload: payload
    };
}
export const get_active_and_future_session_unsuccessful = payload => {
    return {
        type: GET_ACTIVE_AND_FUTURE_SESSION_UNSUCCESSFUL,
        payload: payload
    }
}



export const get_session_with = payload => async dispatch => {

    try {
        let response = await get(`session/show/${payload}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_session_was_unsuccessful());
            }));
        }

        dispatch(get_session_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_session_was_successful = payload => {
    return {
        type: GET_SESSION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_session_was_unsuccessful = payload => {
    return {
        type: GET_SESSION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const initial_payment_for = payload => async dispatch => {
    try {
        let response = await post(payload, 'transaction/store');

        response = await response.json();

        const transaction = response.data;

        //show payment popup
        const handler = await window.PaystackPop.setup({
            key: 'pk_live_841a2ad5b9b0ac15691599a84cd4e532658e62c4',
            email: transaction.user.email,
            amount: transaction.amount * 100,
            ref: transaction.reference_number,
            callback: function (response) {
                dispatch(confirm_payment_for({
                    reference_number: response.reference
                }));
            },
            onClose: function () {
                console.dir('window closed');
            }
        });
        handler.openIframe();

    } catch (error) {
        console.dir(error);
    }
}

export const get_session_number = payload => async dispatch => {

    try {
        let response = await get(`session/tag/${payload.session_id}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_session_number_was_unsuccessful());
            }));
        }

        dispatch(get_session_number_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_session_number_was_successful = payload => {
    return {
        type: GET_SESSION_NUMBER_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_session_number_was_unsuccessful = payload => {
    return {
        type: GET_SESSION_NUMBER_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const confirm_payment_for = payload => async dispatch => {
    try {
        let response = await post(payload, 'purchase-course/confirm');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(confirm_payment_for_was_unsuccessful());
            }));
        }

        dispatch(confirm_payment_for_was_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const confirm_payment_for_was_successful = payload => {
    return {
        type: CONFIRM_TRANSACTION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const confirm_payment_for_was_unsuccessful = payload => {
    return {
        type: CONFIRM_TRANSACTION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}



export const reset_online_payment_transaction = payload => {
    return {
        type: RESET_ONLINE_PAYMENT_TRANSACTION,
        payload: payload
    }
}
