import { get, post } from '../../utils/http_client.js';
import { GET_ACTIVE_FORUM_COMMENT_WAS_SUCCESSFUL, GET_ACTIVE_FORUM_COMMENT_WAS_UNSUCCESSFUL, LIKE_COMMENT_WAS_SUCCESSFUL, LIKE_COMMENT_WAS_UNSUCCESSFUL } from './index';

export const get_active_forum_comments = payload => async dispatch => {

    try {
        let response = await get(`forum-comment/index/${payload}/1`);

        response = await response.json();

        if (response.status !== 200) {
            return window.setTimeout((() => {
                dispatch(get_active_forum_comments_unsuccessful());
            }));
        }

        dispatch(get_active_forum_comments_successful(response));
    } catch (error) {
        console.dir(error);
    }

};
export const get_active_forum_comments_successful = payload => {
    return {
        type: GET_ACTIVE_FORUM_COMMENT_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const get_active_forum_comments_unsuccessful = payload => {
    return {
        type: GET_ACTIVE_FORUM_COMMENT_WAS_UNSUCCESSFUL,
        payload: payload
    }
}




export const like_comment_with = payload => {
    return async dispatch => {

        try {
            let response = await post(payload, 'forum-comment/like');

            response = await response.json();

            if (response.status === 422) {
                return window.setTimeout((() => {
                    dispatch(like_comment_with_was_unsuccessful(response));
                }));
            }

            //pass the token to redux
            dispatch(like_comment_with_was_successful(response));
        } catch (error) {
            console.dir(error);
        }

    }
};
export const like_comment_with_was_successful = payload => {
    return {
        type: LIKE_COMMENT_WAS_SUCCESSFUL,
        payload: payload
    };
}
export const like_comment_with_was_unsuccessful = payload => {
    return {
        type: LIKE_COMMENT_WAS_UNSUCCESSFUL,
        payload: payload
    }
}