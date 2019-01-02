import { post } from '../../../utils/http_client';
import { PAY_WITH_TELLER_WAS_SUCCESSFUL, PAY_WITH_TELLER_WAS_UNSUCCESSFUL, RESET_TRANSACTION_STATUS } from './index';

export const initial_transaction = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'purchase-course/store');

            response = await response.json();

            if (response.status === 422) {
                return window.setTimeout((() => {
                    dispatch(pay_with_transaction_was_unsuccessful(response));
                }));
            }

            //pass the token to redux
            dispatch(pay_with_transaction_was_successful(response));
        } catch (error) {
            console.dir(error);
        }

    }
};


export const pay_with_transaction_was_successful = payload => {
    return {
        type: PAY_WITH_TELLER_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const pay_with_transaction_was_unsuccessful = payload => {
    return {
        type: PAY_WITH_TELLER_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_transaction_status = payload => {
    return {
        type: RESET_TRANSACTION_STATUS,
        payload: payload
    }
}