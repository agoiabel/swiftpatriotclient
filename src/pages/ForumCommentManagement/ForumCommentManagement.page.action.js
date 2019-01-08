import { get, post } from '../../utils/http_client.js';
import {
    GET_FORUM_COMMENT_SUCCESSFUL, GET_FORUM_COMMENT_UNSUCCESSFUL,
    UPDATE_FORUM_COMMENT_SUCCESSFUL, UPDATE_FORUM_COMMENT_UNSUCCESSFUL, RESET_UPDATE_FORUM_COMMENT_STATUS
} from './index';


export const get_forum_comment_for = payload => async dispatch => {

    try {
        let response = await get(`forum-comment/show/${payload.status}`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_forum_comment_for_unsuccessful(response));
            }));
        }
        dispatch(get_forum_comment_for_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_forum_comment_for_successful = payload => {
    return {
        type: GET_FORUM_COMMENT_SUCCESSFUL,
        payload: payload
    };
}
export const get_forum_comment_for_unsuccessful = payload => {
    return {
        type: GET_FORUM_COMMENT_UNSUCCESSFUL,
        payload: payload
    }
}



export const update_forum_comment = payload => async dispatch => {

    try {
        let response = await post(payload, 'forum-comment/update');

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(update_forum_comment_unsuccessful(response));
            }));
        }
        dispatch(update_forum_comment_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const update_forum_comment_successful = payload => {
    return {
        type: UPDATE_FORUM_COMMENT_SUCCESSFUL,
        payload: payload
    };
}
export const update_forum_comment_unsuccessful = payload => {
    return {
        type: UPDATE_FORUM_COMMENT_UNSUCCESSFUL,
        payload: payload
    }
}




export const reset_update_forum_comment_status = () => {
    return {
        type: RESET_UPDATE_FORUM_COMMENT_STATUS
    }
}