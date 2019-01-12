

export const store_reset_password = payload => async dispatch => {
    try {
        let response = await post(payload, 'password/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(store_reset_password_was_unsuccessful());
            }));
        }
        dispatch(store_reset_password_was_successful(response));
    } catch (error) {
        console.dir(error);
    }
};


export const store_reset_password_was_successful = payload => {
    return {
        type: STORE_reset_password_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_reset_password_was_unsuccessful = payload => {
    return {
        type: STORE_reset_password_WAS_UNSUCCESSFUL,
        payload: payload
    }
}
