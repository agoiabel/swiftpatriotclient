import { post } from '../../utils/http_client';
import { DONATION_WAS_SUCCESSFUL, DONATION_WAS_UNSUCCESSFUL, RESET_DONATION_WAS_SUCCESSFUL_STATUS } from './index';

export const store_donation = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'donation/store');

            response = await response.json();

            if (response.status === 422) {
                return window.setTimeout((() => {
                    dispatch(store_donation_was_unsuccessful(response));
                }));
            }

            const transaction = response.data;

            if (transaction.type == "bank_transfer") {
                return dispatch(store_donation_was_successful(response));
            }




            //show payment popup
            const handler = await window.PaystackPop.setup({
                key: 'pk_test_c6107f2bff6d8a2d211f6cce9b9067f612f29a14',
                email: transaction.user.email,
                amount: transaction.amount * 100,
                ref: transaction.reference_number,
                callback: function (response) {
                    dispatch(confirm_payment_for(response.reference));
                },
                onClose: function () {
                    console.dir('window closed');
                    // console.dir('Handle cancelling ');
                }
            });
            handler.openIframe();





        } catch (error) {
            console.dir(error);
        }

    }
};


export const store_donation_was_successful = payload => {
    return {
        type: DONATION_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const store_donation_was_unsuccessful = payload => {
    return {
        type: DONATION_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_donation_status = payload => {
    return {
        type: RESET_DONATION_WAS_SUCCESSFUL_STATUS,
        payload: payload
    }
}




export const confirm_payment_for = payload => {
    return async dispatch => {
        let response = await post({ reference_number: payload }, 'donation/confirm');

        response = await response.json();

        return dispatch(store_donation_was_successful(response));
    }
}
