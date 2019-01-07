import { post } from '../../../utils/http_client';
import { NEW_FORUM_POST_WAS_SUCCESSFUL, NEW_FORUM_POST_WAS_UNSUCCESSFUL, RESET_NEW_FORUM_POST_STATUS } from './index';


export const store_forum_post = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'forum-comment/store');

            response = await response.json();

            if (response.status === 422) {
                return window.setTimeout((() => {
                    dispatch(store_forum_post_was_unsuccessful(response));
                }));
            }

            //pass the token to redux
            dispatch(store_forum_post_was_successful(response));
        } catch (error) {
            console.dir(error);
        }

    }
};


export const store_forum_post_was_successful = payload => {
    return {
        type: NEW_FORUM_POST_WAS_SUCCESSFUL,
        payload: payload
    };
}


export const store_forum_post_was_unsuccessful = payload => {
    return {
        type: NEW_FORUM_POST_WAS_UNSUCCESSFUL,
        payload: payload
    }
}


export const reset_forum_post_status = payload => {
    return {
        type: RESET_NEW_FORUM_POST_STATUS,
        payload: payload
    }
}